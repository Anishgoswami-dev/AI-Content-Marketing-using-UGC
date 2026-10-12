import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Coffee,
  RotateCcw,
  Zap,
  ShieldCheck,
  Video
} from 'lucide-react';
import {
  CampaignFormInputs,
  BusinessCategory,
  PlatformType,
  DurationOption,
  CampaignObjective,
  UGCStyle,
  ToneStyle,
  HookStyle
} from '../types/campaign';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from '../data/templates';

const BUSINESS_CATEGORIES: BusinessCategory[] = [
  'D2C / E-commerce',
  'Beauty and Skincare',
  'Fashion',
  'Food and Beverage',
  'Fitness and Wellness',
  'Education',
  'SaaS / Technology',
  'Local Business',
  'Creator Brand',
  'Home and Lifestyle',
  'Other',
];

const PLATFORMS: PlatformType[] = [
  'Instagram Reels',
  'Facebook Ads',
  'YouTube Shorts',
  'Multi-platform campaign',
];

const DURATIONS: DurationOption[] = [
  '15 seconds',
  '30 seconds',
  '45 seconds',
  '60 seconds',
];

const OBJECTIVES: CampaignObjective[] = [
  'Brand awareness',
  'Product discovery',
  'Website traffic',
  'Lead generation',
  'Sales and conversions',
  'App installs',
];

const UGC_STYLES: UGCStyle[] = [
  'Talking-head creator',
  'Product demonstration',
  'Unboxing',
  'Problem–solution',
  'Testimonial-style concept',
  'Day-in-the-life',
  'Before-and-after demonstration',
  'Educational explainer',
  'Founder-style story',
  'Voiceover with product shots',
];

const TONES: ToneStyle[] = [
  'Friendly',
  'Conversational',
  'Relatable',
  'Premium',
  'Funny',
  'Bold',
  'Educational',
  'Emotional',
  'Professional',
  'Energetic',
];

const HOOK_STYLES: HookStyle[] = [
  'Curiosity',
  'Common mistake',
  'Pain point',
  'Question',
  'Unexpected fact',
  'Product demonstration',
  'Myth versus reality',
  'Relatable situation',
];

const INITIAL_FORM: CampaignFormInputs = {
  brandName: '',
  productName: '',
  category: 'D2C / E-commerce',
  productDescription: '',
  features: '',
  usp: '',
  priceOffer: '',
  targetAudience: '',
  painPoints: '',
  mainBenefit: '',
  websiteUrl: '',
  brandGuidelines: '',
  platform: 'Instagram Reels',
  duration: '30 seconds',
  objective: 'Product discovery',
  ugcStyle: 'Talking-head creator',
  tone: 'Friendly',
  hookStyle: 'Relatable situation',
  language: 'English',
  market: 'Global',
  hookCount: 5,
  scriptCount: 3,
  requiredKeywords: '',
  forbiddenClaims: '',
  preferredCta: '',
};

interface CampaignFormProps {
  initialInputs?: Partial<CampaignFormInputs>;
  onSubmit: (inputs: CampaignFormInputs) => Promise<void>;
  isLoading: boolean;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({
  initialInputs,
  onSubmit,
  isLoading,
}) => {
  const [form, setForm] = useState<CampaignFormInputs>({
    ...INITIAL_FORM,
    ...initialInputs,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.brandName.trim()) errs.brandName = 'Brand name is required';
    if (!form.productName.trim()) errs.productName = 'Product or service name is required';
    if (!form.productDescription.trim() || form.productDescription.length < 15) {
      errs.productDescription = 'Please provide a clear description (min 15 characters)';
    }
    if (!form.features.trim()) errs.features = 'Key product features are required';
    if (!form.usp.trim()) errs.usp = 'Unique Selling Proposition is required';
    if (!form.targetAudience.trim()) errs.targetAudience = 'Target audience is required';
    if (!form.painPoints.trim()) errs.painPoints = 'Audience pain points are required';
    if (!form.mainBenefit.trim()) errs.mainBenefit = 'Main benefit is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }
    await onSubmit(form);
  };

  const handleLoadSkincareDemo = () => {
    setForm({ ...GLOWNEST_DEMO_OUTPUT.inputs });
    setErrors({});
  };

  const handleLoadCafeDemo = () => {
    setForm({ ...BREW_BEAN_DEMO_OUTPUT.inputs });
    setErrors({});
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Demo Quick Bar */}
      <div className="mb-8 rounded-2xl border border-borderColor bg-white p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-violet-brand" />
          <span className="text-xs font-bold text-midnight">Internship Test Campaigns:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSkincareDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-violet-surface text-violet-brand hover:bg-violet-200 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Load GlowNest Skincare (Test A)</span>
          </button>

          <button
            type="button"
            onClick={handleLoadCafeDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-coral-light text-coral-brand hover:bg-coral-100 transition"
          >
            <Coffee className="h-3.5 w-3.5" />
            <span>Load Kolkata Café (Test B)</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-textMuted hover:text-textPrimary hover:bg-gray-100 rounded-lg transition"
            title="Clear Form"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: BRAND & PRODUCT DETAILS */}
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-borderColor">
            <div className="h-8 w-8 rounded-lg bg-violet-surface text-violet-brand flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-base font-bold text-midnight">Brand &amp; Product Details</h3>
              <p className="text-xs text-textMuted">Grounded factual specifications used to construct prompt variables</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Brand Name <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.brandName}
                onChange={e => setForm({ ...form, brandName: e.target.value })}
                placeholder="e.g. GlowNest"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.brandName ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.brandName && <p className="text-[11px] text-red-500 mt-1">{errors.brandName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Product / Service Name <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.productName}
                onChange={e => setForm({ ...form, productName: e.target.value })}
                placeholder="e.g. Hydrating Face Moisturizer"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.productName ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.productName && <p className="text-[11px] text-red-500 mt-1">{errors.productName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Business Category <span className="text-coral-brand">*</span>
              </label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as BusinessCategory })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {BUSINESS_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Market / Target Geography
              </label>
              <input
                type="text"
                value={form.market}
                onChange={e => setForm({ ...form, market: e.target.value })}
                placeholder="e.g. India, Kolkata, USA"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-midnight mb-1">
              Product Description <span className="text-coral-brand">*</span>
            </label>
            <textarea
              rows={2}
              value={form.productDescription}
              onChange={e => setForm({ ...form, productDescription: e.target.value })}
              placeholder="A daily facial moisturizer designed to support a simple skincare routine..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                errors.productDescription ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
              }`}
            />
            {errors.productDescription && <p className="text-[11px] text-red-500 mt-1">{errors.productDescription}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Key Features <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.features}
                onChange={e => setForm({ ...form, features: e.target.value })}
                placeholder="Lightweight texture, quick absorption, non-sticky finish, pump bottle"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.features ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.features && <p className="text-[11px] text-red-500 mt-1">{errors.features}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Unique Selling Proposition (USP) <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.usp}
                onChange={e => setForm({ ...form, usp: e.target.value })}
                placeholder="Simple and convenient hydration without heavy residue"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.usp ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.usp && <p className="text-[11px] text-red-500 mt-1">{errors.usp}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Target Audience Profile <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.targetAudience}
                onChange={e => setForm({ ...form, targetAudience: e.target.value })}
                placeholder="Young adults aged 18–30 interested in skincare, college students"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.targetAudience ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.targetAudience && <p className="text-[11px] text-red-500 mt-1">{errors.targetAudience}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Core Pain Points &amp; Frustrations <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.painPoints}
                onChange={e => setForm({ ...form, painPoints: e.target.value })}
                placeholder="Heavy creams feeling greasy in humid weather; tight dry skin"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.painPoints ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.painPoints && <p className="text-[11px] text-red-500 mt-1">{errors.painPoints}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Main Customer Benefit <span className="text-coral-brand">*</span>
              </label>
              <input
                type="text"
                value={form.mainBenefit}
                onChange={e => setForm({ ...form, mainBenefit: e.target.value })}
                placeholder="Fresh hydration that lasts through the day"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition ${
                  errors.mainBenefit ? 'border-red-400 bg-red-50/30' : 'border-borderColor bg-[#FAF9FD]'
                }`}
              />
              {errors.mainBenefit && <p className="text-[11px] text-red-500 mt-1">{errors.mainBenefit}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Price or Special Offer (Optional)
              </label>
              <input
                type="text"
                value={form.priceOffer || ''}
                onChange={e => setForm({ ...form, priceOffer: e.target.value })}
                placeholder="e.g. Free shipping across India"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Website URL (Optional)
              </label>
              <input
                type="url"
                value={form.websiteUrl || ''}
                onChange={e => setForm({ ...form, websiteUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CAMPAIGN SETTINGS */}
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-borderColor">
            <div className="h-8 w-8 rounded-lg bg-coral-light text-coral-brand flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-base font-bold text-midnight">Campaign Strategy &amp; Pacing</h3>
              <p className="text-xs text-textMuted">Platform formatting and direct-response objective constraints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">Primary Platform</label>
              <select
                value={form.platform}
                onChange={e => setForm({ ...form, platform: e.target.value as PlatformType })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {PLATFORMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">Video Duration</label>
              <select
                value={form.duration}
                onChange={e => setForm({ ...form, duration: e.target.value as DurationOption })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {DURATIONS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">Campaign Objective</label>
              <select
                value={form.objective}
                onChange={e => setForm({ ...form, objective: e.target.value as CampaignObjective })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {OBJECTIVES.map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: CREATIVE SETTINGS & ETHICAL GUARDRAILS */}
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-borderColor">
            <div className="h-8 w-8 rounded-lg bg-midnight text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-base font-bold text-midnight">Creative Direction &amp; Guardrails</h3>
              <p className="text-xs text-textMuted">Tone of voice, hook psychology, and strict ethical constraints</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">UGC Video Style</label>
              <select
                value={form.ugcStyle}
                onChange={e => setForm({ ...form, ugcStyle: e.target.value as UGCStyle })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {UGC_STYLES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">Brand Voice &amp; Tone</label>
              <select
                value={form.tone}
                onChange={e => setForm({ ...form, tone: e.target.value as ToneStyle })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {TONES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">Opening Hook Style</label>
              <select
                value={form.hookStyle}
                onChange={e => setForm({ ...form, hookStyle: e.target.value as HookStyle })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              >
                {HOOK_STYLES.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Required Keywords to Include
              </label>
              <input
                type="text"
                value={form.requiredKeywords || ''}
                onChange={e => setForm({ ...form, requiredKeywords: e.target.value })}
                placeholder="e.g. lightweight, daily hydration, GlowNest"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-midnight mb-1">
                Forbidden Claims (Ethical Boundary)
              </label>
              <input
                type="text"
                value={form.forbiddenClaims || ''}
                onChange={e => setForm({ ...form, forbiddenClaims: e.target.value })}
                placeholder="e.g. no clinical statistics, no fake dermatologist quotes"
                className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-midnight mb-1">
              Preferred Call to Action (Optional)
            </label>
            <input
              type="text"
              value={form.preferredCta || ''}
              onChange={e => setForm({ ...form, preferredCta: e.target.value })}
              placeholder="e.g. Explore the product / Visit the café"
              className="w-full px-3.5 py-2.5 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:outline-none focus:ring-2 focus:ring-violet-brand/20 transition"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-brand via-violet-hover to-midnight hover:shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Generating UGC Ad Campaign Pack...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5 text-coral-brand" />
                <span>Generate Complete UGC Ad Campaign Pack</span>
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-textMuted mt-2.5">
            Generates 5+ hooks, 3 distinct scene-by-scene scripts, ad copy, CTA library, platform variations &amp; testing plan.
          </p>
        </div>
      </form>
    </div>
  );
};
