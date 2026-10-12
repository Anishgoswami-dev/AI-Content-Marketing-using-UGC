import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { CampaignForm } from './components/CampaignForm';
import { ResultsWorkspace } from './components/ResultsWorkspace';
import { PromptLab } from './components/PromptLab';
import { SavedCampaignsView } from './components/SavedCampaignsView';
import { TemplatesView } from './components/TemplatesView';
import { ApiKeyModal } from './components/ApiKeyModal';
import { storageService } from './services/storageService';
import { apiService } from './services/apiService';
import { GeneratedCampaign, CampaignFormInputs } from './types/campaign';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from './data/templates';
import { AlertCircle, CheckCircle2, Key, Sparkles, X } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<
    'landing' | 'dashboard' | 'generator' | 'results' | 'promptlab' | 'templates' | 'campaigns'
  >('landing');

  const [campaigns, setCampaigns] = useState<GeneratedCampaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<GeneratedCampaign>(GLOWNEST_DEMO_OUTPUT);
  const [initialFormInputs, setInitialFormInputs] = useState<Partial<CampaignFormInputs> | undefined>(undefined);

  const [apiKeyConfigured, setApiKeyConfigured] = useState<boolean>(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  const [notification, setNotification] = useState<{
    type: 'success' | 'warning' | 'info';
    message: string;
  } | null>(null);

  // Initialize campaigns from localStorage and check API health
  useEffect(() => {
    refreshCampaigns();
    checkHealth();
  }, []);

  const refreshCampaigns = () => {
    const list = storageService.getCampaigns();
    setCampaigns(list);
  };

  const checkHealth = async () => {
    const health = await apiService.checkHealth();
    setApiKeyConfigured(health.apiKeyConfigured);
  };

  const showNotification = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 6000);
  };

  // Generation Handler
  const handleGenerate = async (inputs: CampaignFormInputs) => {
    setIsLoading(true);
    setNotification(null);

    const result = await apiService.generateCampaign(inputs);

    setIsLoading(false);

    if (result.success && result.campaign) {
      storageService.saveCampaign(result.campaign);
      refreshCampaigns();
      setActiveCampaign(result.campaign);
      setCurrentView('results');

      if (result.isLive) {
        showNotification(
          `Success! UGC Ad Campaign generated with live Gemini AI (${result.modelUsed || 'gemini-1.5-flash'}).`,
          'success'
        );
      } else {
        showNotification(
          result.error || 'Loaded verified campaign pack in Demo Mode (add UGC_API_KEY to .env for live Gemini calls).',
          'warning'
        );
      }
    } else {
      if (result.errorCode === 'MISSING_API_KEY') {
        setIsKeyModalOpen(true);
        showNotification(
          'Gemini API key is not configured on the server. Please add UGC_API_KEY to your .env file or use demo campaigns.',
          'warning'
        );
      } else {
        showNotification(result.error || 'Generation failed. Please try again.', 'warning');
      }
    }
  };

  // Regeneration Handler
  const handleRegenerate = async () => {
    if (!activeCampaign) return;
    setIsRegenerating(true);

    const result = await apiService.generateCampaign(activeCampaign.inputs);
    setIsRegenerating(false);

    if (result.success && result.campaign) {
      storageService.saveCampaign(result.campaign);
      refreshCampaigns();
      setActiveCampaign(result.campaign);
      showNotification('Campaign regenerated with fresh creative angles!', 'success');
    } else {
      showNotification(result.error || 'Regeneration failed', 'warning');
    }
  };

  const handleStartCampaign = (inputs?: Partial<CampaignFormInputs>) => {
    setInitialFormInputs(inputs);
    setCurrentView('generator');
  };

  const handleOpenCampaign = (campaign: GeneratedCampaign) => {
    setActiveCampaign(campaign);
    setCurrentView('results');
  };

  return (
    <div className="min-h-screen bg-offwhite flex flex-col font-sans">
      {/* Top Banner Alert (if configured or demo warning) */}
      {notification && (
        <div
          className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-600 text-white'
              : notification.type === 'warning'
              ? 'bg-amber-600 text-white'
              : 'bg-midnight text-white'
          }`}
        >
          <div className="flex items-center gap-2 max-w-5xl mx-auto">
            {notification.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-80">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={view => setCurrentView(view)}
        apiKeyConfigured={apiKeyConfigured}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        campaignsCount={campaigns.length}
      />

      {/* Primary Page Views */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartCampaign={handleStartCampaign}
            onViewDemoCampaign={handleOpenCampaign}
            onExploreTemplates={() => setCurrentView('templates')}
            onOpenPromptLab={() => setCurrentView('promptlab')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardOverview
            campaigns={campaigns}
            onOpenCampaign={handleOpenCampaign}
            onNewCampaign={handleStartCampaign}
            onOpenPromptLab={() => setCurrentView('promptlab')}
            onExploreTemplates={() => setCurrentView('templates')}
            onRefreshCampaigns={refreshCampaigns}
            apiKeyConfigured={apiKeyConfigured}
            onOpenKeyModal={() => setIsKeyModalOpen(true)}
          />
        )}

        {currentView === 'generator' && (
          <CampaignForm
            initialInputs={initialFormInputs}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />
        )}

        {currentView === 'results' && activeCampaign && (
          <ResultsWorkspace
            campaign={activeCampaign}
            onUpdateCampaign={updated => {
              setActiveCampaign(updated);
              refreshCampaigns();
            }}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
            onOpenPromptLab={() => setCurrentView('promptlab')}
          />
        )}

        {currentView === 'promptlab' && (
          <PromptLab
            currentCampaign={activeCampaign}
            onGenerateWithCustomPrompt={handleGenerate}
            isLoading={isLoading}
          />
        )}

        {currentView === 'campaigns' && (
          <SavedCampaignsView
            campaigns={campaigns}
            onOpenCampaign={handleOpenCampaign}
            onRefreshCampaigns={refreshCampaigns}
            onNewCampaign={() => handleStartCampaign()}
          />
        )}

        {currentView === 'templates' && (
          <TemplatesView
            onUseTemplate={inputs => handleStartCampaign(inputs)}
            onPreviewDemo={handleOpenCampaign}
          />
        )}
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKeyConfigured={apiKeyConfigured}
        onRefreshHealth={checkHealth}
      />
    </div>
  );
}

export default App;
