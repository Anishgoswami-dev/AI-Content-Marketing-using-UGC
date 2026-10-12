import { CampaignFormInputs, GeneratedCampaign } from '../types/campaign';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from '../data/templates';
import { buildMasterUGCPrompt } from '../utils/promptBuilder';

export interface GenerateResult {
  success: boolean;
  campaign?: GeneratedCampaign;
  error?: string;
  errorCode?: string;
  isLive: boolean;
  modelUsed?: string;
}

export const apiService = {
  async checkHealth(): Promise<{ status: string; apiKeyConfigured: boolean }> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        return await res.json();
      }
      return { status: 'error', apiKeyConfigured: false };
    } catch {
      return { status: 'offline', apiKeyConfigured: false };
    }
  },

  async generateCampaign(inputs: CampaignFormInputs, forceDemoFallback = false): Promise<GenerateResult> {
    const prompt = buildMasterUGCPrompt(inputs);

    // If inputs match demo campaigns and user requested demo or wants fallback
    const isSkincareDemo = inputs.brandName.toLowerCase().includes('glownest');
    const isCafeDemo = inputs.brandName.toLowerCase().includes('brew & bean');

    try {
      const response = await fetch('/api/generate-ugc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          inputs,
        }),
      });

      const json = await response.json();

      if (response.ok && json.success && json.data) {
        const generated: GeneratedCampaign = {
          id: 'campaign-' + Date.now(),
          createdAt: new Date().toISOString(),
          title: `${inputs.brandName} — ${inputs.productName} Campaign`,
          inputs,
          summary: json.data.summary || {
            brand: inputs.brandName,
            product: inputs.productName,
            targetAudience: inputs.targetAudience,
            coreBenefit: inputs.mainBenefit,
            platform: inputs.platform,
            duration: inputs.duration,
            objective: inputs.objective,
            tone: inputs.tone,
            style: inputs.ugcStyle,
          },
          hooks: json.data.hooks || [],
          scripts: json.data.scripts || [],
          captions: json.data.captions || [],
          headlines: json.data.headlines || [],
          primaryTexts: json.data.primaryTexts || [],
          ctas: json.data.ctas || [],
          platformVariations: json.data.platformVariations || [],
          testingPlan: json.data.testingPlan || [],
          promptInsights: {
            ...(json.data.promptInsights || {}),
            sanitizedRawPrompt: prompt,
          },
          isDemo: false,
        };

        return {
          success: true,
          campaign: generated,
          isLive: true,
          modelUsed: json.modelUsed || 'gemini-1.5-flash',
        };
      }

      // If backend returned missing key or error
      if (json.code === 'MISSING_API_KEY' || forceDemoFallback) {
        if (isSkincareDemo) {
          return {
            success: true,
            campaign: {
              ...GLOWNEST_DEMO_OUTPUT,
              id: 'campaign-' + Date.now(),
              createdAt: new Date().toISOString(),
              isDemo: true,
            },
            isLive: false,
            error: 'UGC_API_KEY not configured. Loaded verified GlowNest benchmark demo pack.',
            errorCode: 'DEMO_MODE_LOADED',
          };
        } else if (isCafeDemo) {
          return {
            success: true,
            campaign: {
              ...BREW_BEAN_DEMO_OUTPUT,
              id: 'campaign-' + Date.now(),
              createdAt: new Date().toISOString(),
              isDemo: true,
            },
            isLive: false,
            error: 'UGC_API_KEY not configured. Loaded verified Brew & Bean Kolkata Café benchmark demo pack.',
            errorCode: 'DEMO_MODE_LOADED',
          };
        }

        return {
          success: false,
          error: json.error || 'Server reported UGC_API_KEY is not set.',
          errorCode: json.code || 'MISSING_API_KEY',
          isLive: false,
        };
      }

      return {
        success: false,
        error: json.error || 'Failed to generate campaign',
        errorCode: json.code || 'UNKNOWN_ERROR',
        isLive: false,
      };
    } catch (err: any) {
      // Backend not running or network failed
      if (isSkincareDemo) {
        return {
          success: true,
          campaign: { ...GLOWNEST_DEMO_OUTPUT, id: 'campaign-' + Date.now(), isDemo: true },
          isLive: false,
          error: 'Backend offline. Loaded client-side verified GlowNest benchmark demo.',
          errorCode: 'OFFLINE_DEMO',
        };
      } else if (isCafeDemo) {
        return {
          success: true,
          campaign: { ...BREW_BEAN_DEMO_OUTPUT, id: 'campaign-' + Date.now(), isDemo: true },
          isLive: false,
          error: 'Backend offline. Loaded client-side verified Brew & Bean Kolkata Café benchmark demo.',
          errorCode: 'OFFLINE_DEMO',
        };
      }

      return {
        success: false,
        error: `Could not connect to UGCraft backend server: ${err.message}. Make sure server is running on port 3001.`,
        errorCode: 'NETWORK_ERROR',
        isLive: false,
      };
    }
  },
};
