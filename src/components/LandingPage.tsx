import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Video,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Zap,
  Copy,
  Clock,
  Sliders
} from 'lucide-react';
import { TEMPLATES, GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from '../data/templates';
import { CampaignFormInputs, GeneratedCampaign } from '../types/campaign';

interface LandingPageProps {
  onStartCampaign: (initialInputs?: Partial<CampaignFormInputs>) => void;
  onViewDemoCampaign: (campaign: GeneratedCampaign) => void;
  onExploreTemplates: () => void;
  onOpenPromptLab: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCampaign,
  onViewDemoCampaign,
  onExploreTemplates,
  onOpenPromptLab,
}) => {
  const [activeTab, setActiveTab] = useState<'hooks' | 'scripts' | 'matrix'>('scripts');
  const [previewSample, setPreviewSample] = useState<'glownest' | 'cafe'>('glownest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleCampaign = previewSample === 'glownest' ? GLOWNEST_DEMO_OUTPUT : BREW_BEAN_DEMO_OUTPUT;

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-offwhite selection:bg-violet-surface selection:text-violet-brand">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 gradient-bg-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-surface border border-violet-200 shadow-sm mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-violet-brand animate-ping" />
            <span className="text-xs font-bold text-violet-brand uppercase tracking-wider">
              Future Interns Prompt Engineering Task 2
            </span>
          </div>

          {/* Master Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-midnight max-w-4xl mx-auto leading-[1.1] mb-6">
            Create UGC Ads That <span className="gradient-text-hero">Feel Real.</span> And Sell.
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-xl text-textMuted max-w-2xl mx-auto leading-relaxed mb-10">
            Generate high-converting, creator-style advertising content using structured 16-point prompt engineering. From thumb-stopping opening hooks to scene-by-scene video scripts and testing hypotheses.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onStartCampaign()}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-brand via-violet-hover to-midnight hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              <Sparkles className="h-5 w-5 text-coral-brand" />
              <span>Create My First Ad</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onExploreTemplates}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-bold text-textPrimary bg-white hover:bg-violet-surface border border-borderColor hover:border-violet-300 transition-all shadow-sm"
            >
              <Layers className="h-5 w-5 text-violet-brand" />
              <span>Explore Templates</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-textMuted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>No Fabricated Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-brand" />
              <span>Structured 16-Point Prompting</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-coral-brand" />
              <span>Direct-Response Script Timelines</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE PRODUCT DASHBOARD PREVIEW */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-3xl border border-borderColor bg-white shadow-2xl overflow-hidden transition-all">
            {/* Mockup Topbar */}
            <div className="bg-midnight px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-midnight-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-coral-brand" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-gray-400 ml-2">UGCraft Studio Workspace — Live Preview</span>
              </div>

              {/* Sample Selector */}
              <div className="flex items-center gap-2 bg-midnight-700 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewSample('glownest')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    previewSample === 'glownest' ? 'bg-violet-brand text-white shadow' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  GlowNest Skincare (Test A)
                </button>
                <button
                  onClick={() => setPreviewSample('cafe')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    previewSample === 'cafe' ? 'bg-violet-brand text-white shadow' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Brew &amp; Bean Café (Test B)
                </button>
              </div>
            </div>

            {/* Mockup Tabs */}
            <div className="bg-[#FAF9FD] px-6 py-3 border-b border-borderColor flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('scripts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeTab === 'scripts'
                      ? 'bg-white text-violet-brand shadow-sm border border-borderColor'
                      : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  Video Ad Scripts ({sampleCampaign.scripts.length})
                </button>
                <button
                  onClick={() => setActiveTab('hooks')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeTab === 'hooks'
                      ? 'bg-white text-violet-brand shadow-sm border border-borderColor'
                      : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  Scroll-Stopping Hooks ({sampleCampaign.hooks.length})
                </button>
                <button
                  onClick={() => setActiveTab('matrix')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeTab === 'matrix'
                      ? 'bg-white text-violet-brand shadow-sm border border-borderColor'
                      : 'text-textMuted hover:text-textPrimary'
                  }`}
                >
                  <Sliders className="h-3.5 w-3.5" />
                  Testing Hypothesis Matrix
                </button>
              </div>

              <button
                onClick={() => onViewDemoCampaign(sampleCampaign)}
                className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1 shrink-0 ml-4"
              >
                Open Full Campaign Pack <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {/* Mockup Content Body */}
            <div className="p-6 bg-white min-h-[380px]">
              {activeTab === 'scripts' && (
                <div className="space-y-4">
                  {sampleCampaign.scripts.slice(0, 1).map(script => (
                    <div key={script.id} className="rounded-2xl border border-borderColor p-5 bg-[#FAF9FD]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-violet-brand bg-violet-surface px-2.5 py-1 rounded-md">
                            Angle: {script.creativeAngle}
                          </span>
                          <h4 className="text-lg font-bold text-textPrimary mt-1.5">{script.title}</h4>
                        </div>
                        <span className="text-xs font-medium text-textMuted bg-white border border-borderColor px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 30-Second Storyboard
                        </span>
                      </div>

                      {/* Scene Timeline Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                        {script.scenes.map((scene, sIdx) => (
                          <div key={sIdx} className="bg-white p-3 rounded-xl border border-borderColor text-xs flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1.5 font-bold text-violet-brand text-[11px]">
                                <span>Beat #{sIdx + 1}</span>
                                <span className="font-mono text-gray-500">{scene.timeRange}</span>
                              </div>
                              <p className="font-semibold text-textPrimary text-xs mb-1 line-clamp-2">
                                "{scene.spokenDialogue}"
                              </p>
                              <p className="text-[11px] text-textMuted line-clamp-2">
                                <span className="font-semibold">Visual:</span> {scene.visualDirection}
                              </p>
                            </div>
                            <div className="mt-2 pt-1.5 border-t border-gray-100 text-[10px] text-coral-brand font-medium">
                              OST: {scene.onScreenText}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-borderColor text-xs">
                        <span className="text-textMuted">
                          <strong className="text-textPrimary">CTA:</strong> "{script.callToAction}"
                        </span>
                        <button
                          onClick={() => handleCopyText(script.scenes.map(s => `[${s.timeRange}] ${s.spokenDialogue}`).join('\n'), script.id)}
                          className="flex items-center gap-1 text-violet-brand font-bold hover:underline"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          {copiedId === script.id ? 'Copied!' : 'Copy Script'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'hooks' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleCampaign.hooks.map((hook, hIdx) => (
                    <div key={hook.id} className="rounded-xl border border-borderColor p-4 bg-[#FAF9FD] flex flex-col justify-between hover:shadow-card transition">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2 py-0.5 rounded">
                            {hook.category}
                          </span>
                          <span className="text-[10px] text-textMuted font-mono">Hook #{hIdx + 1}</span>
                        </div>
                        <p className="text-sm font-bold text-textPrimary mb-2 leading-snug">
                          "{hook.hookText}"
                        </p>
                        <p className="text-xs text-textMuted mb-2">
                          <strong className="text-textPrimary">Why it hooks:</strong> {hook.audienceMotivation}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-borderColor flex items-center justify-between text-xs">
                        <span className="text-[11px] text-textMuted truncate max-w-[170px]">
                          {hook.recommendedCreativeUse}
                        </span>
                        <button
                          onClick={() => handleCopyText(hook.hookText, hook.id)}
                          className="text-violet-brand font-bold hover:underline ml-2"
                        >
                          {copiedId === hook.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'matrix' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF9FD] text-textPrimary uppercase tracking-wider text-[10px] border-b border-borderColor">
                      <tr>
                        <th className="py-2.5 px-3">Hook Under Test</th>
                        <th className="py-2.5 px-3">Creative Angle</th>
                        <th className="py-2.5 px-3">Core Message</th>
                        <th className="py-2.5 px-3">Call to Action</th>
                        <th className="py-2.5 px-3">Testable Hypothesis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderColor">
                      {sampleCampaign.testingPlan.map(t => (
                        <tr key={t.id} className="hover:bg-violet-light/40">
                          <td className="py-3 px-3 font-semibold text-textPrimary">{t.hook}</td>
                          <td className="py-3 px-3 text-textMuted">{t.creativeAngle}</td>
                          <td className="py-3 px-3 text-textMuted">{t.coreMessage}</td>
                          <td className="py-3 px-3 font-medium text-violet-brand">{t.cta}</td>
                          <td className="py-3 px-3 text-textMuted italic">{t.hypothesis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS SECTION */}
      <section className="py-16 bg-white border-y border-borderColor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-brand mb-2">Native Delivery</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-midnight">
              Tailored for Modern Short-Form Video Algorithms
            </h3>
            <p className="text-textMuted text-sm mt-2">
              UGCraft AI doesn't duplicate identical copy. It adapts visual pacing, safe zones, and sound-on vs sound-off behaviors per platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-borderColor p-6 bg-[#FAF9FD] hover:border-violet-300 transition-all shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white mb-4">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <h4 className="text-lg font-bold text-midnight mb-2">Instagram Reels</h4>
              <p className="text-xs text-textMuted leading-relaxed mb-4">
                Designed for aesthetic discovery, selfie-cam creator authenticity, trending audio rhythm, and center-screen safe margins avoiding UI icons.
              </p>
              <ul className="space-y-1.5 text-xs text-textPrimary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 9:16 vertical ratio formatting
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Middle-third text sticker placement
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Link-in-bio &amp; saveable engagement CTAs
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-borderColor p-6 bg-[#FAF9FD] hover:border-violet-300 transition-all shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-4">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <h4 className="text-lg font-bold text-midnight mb-2">Facebook Ads (Meta)</h4>
              <p className="text-xs text-textMuted leading-relaxed mb-4">
                Engineered for feed scrollers with 85% sound-off viewing. Highlights immediate problem agitation and clear burned-in captions.
              </p>
              <ul className="space-y-1.5 text-xs text-textPrimary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Sound-off readable on-screen text
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 3 paid ad primary text variations
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Direct-response Shop Now CTAs
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-borderColor p-6 bg-[#FAF9FD] hover:border-violet-300 transition-all shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white mb-4">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <h4 className="text-lg font-bold text-midnight mb-2">YouTube Shorts</h4>
              <p className="text-xs text-textMuted leading-relaxed mb-4">
                Optimized for ultra-fast swipe feeds where viewers decide in 1 second. Fast visual transitions and curiosity-driven storylines.
              </p>
              <ul className="space-y-1.5 text-xs text-textPrimary">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Instant sub-1-second visual interrupt
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Pinned comment and subscriber hooks
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Safe zone clearance for bottom titles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP WORKFLOW */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-brand mb-2">How It Works</h2>
            <h3 className="text-3xl font-extrabold text-midnight">From Offer to Production-Ready UGC in 3 Steps</h3>
            <p className="text-textMuted text-sm mt-2">
              Our structured prompt pipeline transforms raw product specifications into authentic creator scripts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-2xl bg-white p-8 border border-borderColor shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-surface text-violet-brand font-black text-xl mb-6">
                1
              </div>
              <h4 className="text-lg font-bold text-midnight mb-3">Define Brand &amp; Offer</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Provide product features, USP, target audience demographics, and core customer friction points. Or start instantly with one of our 6 industry templates.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white p-8 border border-borderColor shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light text-coral-brand font-black text-xl mb-6">
                2
              </div>
              <h4 className="text-lg font-bold text-midnight mb-3">Select Creator Angles</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Choose UGC formats (Talking Head, Day-in-the-Life, Unboxing), psychological hook styles, tone (Relatable, Conversational), duration (15s–60s), and platform.
              </p>
            </div>

            <div className="relative rounded-2xl bg-white p-8 border border-borderColor shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-midnight text-white font-black text-xl mb-6">
                3
              </div>
              <h4 className="text-lg font-bold text-midnight mb-3">Generate &amp; Deploy</h4>
              <p className="text-xs text-textMuted leading-relaxed">
                Receive 5+ hooks, 3+ scene-by-scene scripts, ad copy, CTA libraries, and a creative testing plan. Edit inline, copy, or export to Markdown and plain text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY */}
      <section className="py-20 bg-white border-t border-borderColor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-brand mb-1">Production-Ready Starter Packs</h2>
              <h3 className="text-3xl font-extrabold text-midnight">Industry UGC Templates</h3>
            </div>
            <button
              onClick={onExploreTemplates}
              className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
            >
              View All 6 Templates <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map(tpl => (
              <div
                key={tpl.id}
                className="rounded-2xl border border-borderColor p-6 bg-[#FAF9FD] hover:bg-white hover:border-violet-300 hover:shadow-card transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2.5 py-1 rounded-md">
                      {tpl.category}
                    </span>
                    <span className="text-xs text-textMuted font-medium">{tpl.inputs.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-midnight mb-1">{tpl.name}</h4>
                  <p className="text-xs text-textMuted mb-4">{tpl.tagline}</p>

                  <div className="space-y-1 text-xs text-textPrimary mb-6">
                    <p><strong className="text-textMuted">Product:</strong> {tpl.inputs.productName}</p>
                    <p><strong className="text-textMuted">Tone:</strong> {tpl.inputs.tone}</p>
                    <p><strong className="text-textMuted">Style:</strong> {tpl.inputs.ugcStyle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-borderColor">
                  <button
                    onClick={() => onStartCampaign(tpl.inputs)}
                    className="flex-1 py-2 px-3 text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover rounded-xl transition text-center shadow-sm"
                  >
                    Use Template
                  </button>
                  {tpl.demoOutput && (
                    <button
                      onClick={() => onViewDemoCampaign(tpl.demoOutput!)}
                      className="py-2 px-3 text-xs font-bold text-textPrimary bg-white border border-borderColor hover:bg-violet-surface rounded-xl transition"
                    >
                      Preview Demo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STRUCTURED PROMPTS MATTER (PROMPT ENGINEERING ADVANTAGE) */}
      <section className="py-20 bg-midnight text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-300">Prompt Engineering Insights</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Structured Prompting Outperforms Generic AI
            </h3>
            <p className="text-gray-400 text-sm mt-3">
              Standard ChatGPT prompts produce bland infomercials with fake statistics. UGCraft AI’s 16-point framework locks down factuality while unleashing genuine creator flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>❌</span> Generic AI Outputs (Unstructured)
              </h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">•</span>
                  <span>Fabricates fake clinical reviews ("Sarah from NY cured her acne in 48 hours") that violate FTC/ASCI regulations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">•</span>
                  <span>Invents non-existent business hours, false discount codes, and fake local awards for cafés.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">•</span>
                  <span>Sounds like a 1990s TV infomercial rather than an authentic creator on a selfie camera.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">•</span>
                  <span>Vague timing instructions leading to scripts that run way over or under 30 seconds.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-violet-500/40 bg-violet-950/20 p-6">
              <h4 className="text-sm font-bold text-violet-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span>✅</span> UGCraft AI 16-Point Framework
              </h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold shrink-0">•</span>
                  <span><strong>Zero Hallucinations:</strong> Strict ethical constraints forbid fabricated medical, clinical, or pricing claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold shrink-0">•</span>
                  <span><strong>Speakable creator cadence:</strong> Generates natural pauses, colloquial phrasing, and conversational momentum.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold shrink-0">•</span>
                  <span><strong>Production-Ready Timestamps:</strong> Structured scene breakdowns mapped directly to selected ad duration (15s–60s).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold shrink-0">•</span>
                  <span><strong>Inspectable Prompt Lab:</strong> Full visibility into system instructions, variables, and ethical checks.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onOpenPromptLab}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-brand hover:bg-violet-hover text-white text-xs font-bold transition shadow-glow"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Inspect Prompt Engineering Lab</span>
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-gradient-to-tr from-midnight via-midnight-700 to-violet-900 text-white p-10 sm:p-16 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Ready to Generate Ads That Actually Convert?
              </h3>
              <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base mb-8">
                Start with our verified GlowNest Skincare or Kolkata Café templates, or build a custom campaign for your own product in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onStartCampaign()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-midnight bg-white hover:bg-violet-surface transition shadow-lg"
                >
                  Create My First Ad Now
                </button>
                <button
                  onClick={() => onViewDemoCampaign(GLOWNEST_DEMO_OUTPUT)}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold text-white bg-midnight-700 hover:bg-midnight-800 border border-gray-600 transition"
                >
                  ⚡ View Skincare Demo Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-borderColor py-12 text-xs text-textMuted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-midnight flex items-center justify-center text-white">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            </div>
            <div>
              <p className="font-bold text-midnight text-sm">UGCraft AI</p>
              <p className="text-[11px]">Future Interns Prompt Engineering Internship | Task 2 (FUTURE_PE_02)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={() => onStartCampaign()} className="hover:text-textPrimary transition">Ad Generator</button>
            <button onClick={onExploreTemplates} className="hover:text-textPrimary transition">Templates</button>
            <button onClick={onOpenPromptLab} className="hover:text-textPrimary transition">Prompt Lab</button>
            <span className="text-gray-300">|</span>
            <span>Tagline: Create Authentic UGC Ads That Connect, Engage &amp; Convert</span>
          </div>

          <div className="text-center sm:text-right text-[11px]">
            <p>© 2026 UGCraft AI. Built for portfolio &amp; production evaluation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
