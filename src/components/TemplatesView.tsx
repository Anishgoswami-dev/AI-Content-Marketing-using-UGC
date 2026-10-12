import React from 'react';
import { Sparkles, Layers, ArrowRight, Eye, Wand2, Coffee, ShieldCheck } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { CampaignFormInputs, GeneratedCampaign } from '../types/campaign';

interface TemplatesViewProps {
  onUseTemplate: (inputs: CampaignFormInputs) => void;
  onPreviewDemo: (campaign: GeneratedCampaign) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onUseTemplate,
  onPreviewDemo,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderColor">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-surface text-violet-brand text-xs font-bold mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>Curated Creative Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-midnight">
            UGC Ad Templates Gallery
          </h1>
          <p className="text-xs sm:text-sm text-textMuted mt-1">
            Production-ready templates with pre-calibrated audience psychology, hook archetypes, and tone settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map(tpl => (
          <div
            key={tpl.id}
            className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm hover:border-violet-300 hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2.5 py-1 rounded-md">
                  {tpl.category}
                </span>
                <span className="text-xs text-textMuted font-mono">{tpl.inputs.duration}</span>
              </div>

              <h3 className="text-lg font-bold text-midnight mb-1">{tpl.name}</h3>
              <p className="text-xs text-textMuted mb-4">{tpl.tagline}</p>

              <div className="space-y-1.5 text-xs text-textPrimary mb-6 p-3 rounded-xl bg-[#FAF9FD] border border-borderColor">
                <p><strong className="text-textMuted">Product:</strong> {tpl.inputs.productName}</p>
                <p><strong className="text-textMuted">Platform:</strong> {tpl.inputs.platform}</p>
                <p><strong className="text-textMuted">UGC Style:</strong> {tpl.inputs.ugcStyle}</p>
                <p><strong className="text-textMuted">Voice Tone:</strong> {tpl.inputs.tone}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-borderColor flex items-center gap-2">
              <button
                onClick={() => onUseTemplate(tpl.inputs)}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover rounded-xl transition text-center shadow-sm flex items-center justify-center gap-1.5"
              >
                <Wand2 className="h-3.5 w-3.5" />
                <span>Use Template</span>
              </button>

              {tpl.demoOutput && (
                <button
                  onClick={() => onPreviewDemo(tpl.demoOutput!)}
                  className="py-2 px-3 text-xs font-bold text-textPrimary bg-white border border-borderColor hover:bg-violet-surface rounded-xl transition flex items-center gap-1"
                >
                  <Eye className="h-3.5 w-3.5 text-violet-brand" />
                  <span>Demo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
