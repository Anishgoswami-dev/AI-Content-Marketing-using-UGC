export type BusinessCategory =
  | 'D2C / E-commerce'
  | 'Beauty and Skincare'
  | 'Fashion'
  | 'Food and Beverage'
  | 'Fitness and Wellness'
  | 'Education'
  | 'SaaS / Technology'
  | 'Local Business'
  | 'Creator Brand'
  | 'Home and Lifestyle'
  | 'Other';

export type PlatformType =
  | 'Instagram Reels'
  | 'Facebook Ads'
  | 'YouTube Shorts'
  | 'Multi-platform campaign';

export type DurationOption = '15 seconds' | '30 seconds' | '45 seconds' | '60 seconds';

export type CampaignObjective =
  | 'Brand awareness'
  | 'Product discovery'
  | 'Website traffic'
  | 'Lead generation'
  | 'Sales and conversions'
  | 'App installs';

export type UGCStyle =
  | 'Talking-head creator'
  | 'Product demonstration'
  | 'Unboxing'
  | 'Problem–solution'
  | 'Testimonial-style concept'
  | 'Day-in-the-life'
  | 'Before-and-after demonstration'
  | 'Educational explainer'
  | 'Founder-style story'
  | 'Voiceover with product shots';

export type ToneStyle =
  | 'Friendly'
  | 'Conversational'
  | 'Relatable'
  | 'Premium'
  | 'Funny'
  | 'Bold'
  | 'Educational'
  | 'Emotional'
  | 'Professional'
  | 'Energetic';

export type HookStyle =
  | 'Curiosity'
  | 'Common mistake'
  | 'Pain point'
  | 'Question'
  | 'Unexpected fact'
  | 'Product demonstration'
  | 'Myth versus reality'
  | 'Relatable situation';

export interface CampaignFormInputs {
  brandName: string;
  productName: string;
  category: BusinessCategory;
  productDescription: string;
  features: string;
  usp: string;
  priceOffer?: string;
  targetAudience: string;
  painPoints: string;
  mainBenefit: string;
  websiteUrl?: string;
  brandGuidelines?: string;
  platform: PlatformType;
  duration: DurationOption;
  objective: CampaignObjective;
  ugcStyle: UGCStyle;
  tone: ToneStyle;
  hookStyle: HookStyle;
  language: string;
  market: string;
  hookCount: number;
  scriptCount: number;
  requiredKeywords?: string;
  forbiddenClaims?: string;
  preferredCta?: string;
}

export interface HookItem {
  id: string;
  hookText: string;
  category: string;
  audienceMotivation: string;
  recommendedCreativeUse: string;
}

export interface Scene {
  timeRange: string;
  visualDirection: string;
  spokenDialogue: string;
  onScreenText: string;
  audioNotes?: string;
}

export interface VideoScript {
  id: string;
  title: string;
  creativeAngle: string;
  openingHook: string;
  scenes: Scene[];
  productDemoNotes: string;
  callToAction: string;
  suggestedCaption: string;
}

export interface PlatformVariation {
  platform: string;
  angle: string;
  openingHook: string;
  adaptationStrategy: string;
  captionSnippet: string;
  ctaText: string;
  formattingNotes: string;
}

export interface TestingHypothesis {
  id: string;
  hook: string;
  creativeAngle: string;
  coreMessage: string;
  cta: string;
  hypothesis: string;
}

export interface PromptInsights {
  roleAndTask: string;
  contextVariables: Record<string, string>;
  audiencePersonalization: string;
  toneAdaptation: string;
  platformConstraints: string;
  hookStrategyExplanation: string;
  conversionStructureExplanation: string;
  qualityControlRules: string[];
  ethicalGuardrailsAudit: string[];
  whyStructuredThisWay: string;
  missingInformationSuggestions: string[];
  sanitizedRawPrompt: string;
}

export interface GeneratedCampaign {
  id: string;
  createdAt: string;
  updatedAt?: string;
  title: string;
  inputs: CampaignFormInputs;
  summary: {
    brand: string;
    product: string;
    targetAudience: string;
    coreBenefit: string;
    platform: string;
    duration: string;
    objective: string;
    tone: string;
    style: string;
  };
  hooks: HookItem[];
  scripts: VideoScript[];
  captions: string[];
  headlines: string[];
  primaryTexts: string[];
  ctas: {
    type: 'Direct' | 'Soft' | 'Curiosity' | 'Urgency' | 'Community';
    text: string;
  }[];
  platformVariations: PlatformVariation[];
  testingPlan: TestingHypothesis[];
  promptInsights: PromptInsights;
  isDemo?: boolean;
}
