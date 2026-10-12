import React from 'react';
import {
  Sparkles,
  Wand2,
  BookOpen,
  FolderGit2,
  Zap,
  Video,
  Layers,
  ArrowRight,
  Clock,
  Trash2,
  Copy,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';
import { GeneratedCampaign, CampaignFormInputs } from '../types/campaign';
import { storageService } from '../services/storageService';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT, TEMPLATES } from '../data/templates';

interface DashboardOverviewProps {
  campaigns: GeneratedCampaign[];
  onOpenCampaign: (campaign: GeneratedCampaign) => void;
  onNewCampaign: (initialInputs?: Partial<CampaignFormInputs>) => void;
  onOpenPromptLab: () => void;
  onExploreTemplates: () => void;
  onRefreshCampaigns: () => void;
  apiKeyConfigured: boolean;
  onOpenKeyModal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  campaigns,
  onOpenCampaign,
  onNewCampaign,
  onOpenPromptLab,
  onExploreTemplates,
  onRefreshCampaigns,
  apiKeyConfigured,
  onOpenKeyModal,
}) => {
  const stats = storageService.getStats();

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      storageService.deleteCampaign(id);
      onRefreshCampaigns();
    }
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const dup = storageService.duplicateCampaign(id);
    if (dup) {
      onRefreshCampaigns();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* WELCOME BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-midnight via-midnight-700 to-violet-950 p-6 sm:p-10 text-white shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-brand/30 border border-violet-400/30 text-violet-200 text-xs font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI UGC Ad Generation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Welcome to UGCraft Studio
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Generate authentic, conversion-focused creator ads using our 16-point prompt engineering architecture. Zero fabricated claims, speakable scripts, and testable hypotheses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => onNewCampaign()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-brand hover:bg-violet-hover text-white text-xs font-bold transition shadow-glow"
            >
              <Wand2 className="h-4 w-4" />
              <span>New Campaign</span>
            </button>
            <button
              onClick={() => onOpenCampaign(GLOWNEST_DEMO_OUTPUT)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
            >
              ⚡ Skincare Demo
            </button>
            <button
              onClick={() => onOpenCampaign(BREW_BEAN_DEMO_OUTPUT)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
            >
              ⚡ Kolkata Café Demo
            </button>
          </div>
        </div>
      </div>

      {/* REAL CALCULATED STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-textMuted mb-2">
            <span className="text-xs font-semibold">Saved Campaigns</span>
            <div className="h-8 w-8 rounded-lg bg-violet-surface text-violet-brand flex items-center justify-center">
              <FolderGit2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-midnight">{stats.totalCampaigns}</p>
          <p className="text-[11px] text-textMuted mt-1">Stored locally in browser</p>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-textMuted mb-2">
            <span className="text-xs font-semibold">Active Hooks</span>
            <div className="h-8 w-8 rounded-lg bg-coral-light text-coral-brand flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-midnight">{stats.totalHooks}</p>
          <p className="text-[11px] text-textMuted mt-1">Scroll-stopping variations</p>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-textMuted mb-2">
            <span className="text-xs font-semibold">Video Scripts</span>
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Video className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-midnight">{stats.totalScripts}</p>
          <p className="text-[11px] text-textMuted mt-1">Storyboards with B-roll &amp; OST</p>
        </div>

        <div className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-textMuted mb-2">
            <span className="text-xs font-semibold">Gemini API Status</span>
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${apiKeyConfigured ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
              <Shield className="h-4 w-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-midnight flex items-center gap-2 mt-1">
            <span className={`h-2.5 w-2.5 rounded-full ${apiKeyConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            {apiKeyConfigured ? 'Live Generation Ready' : 'Setup Required'}
          </p>
          <button
            onClick={onOpenKeyModal}
            className="text-[11px] font-semibold text-violet-brand hover:underline mt-1 block"
          >
            {apiKeyConfigured ? 'View API config' : 'Configure UGC_API_KEY'}
          </button>
        </div>
      </div>

      {/* QUICK LAUNCH TEMPLATES & CAMPAIGN FORMATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Launch Templates */}
        <div className="lg:col-span-2 rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-midnight">Quick-Start Templates</h3>
              <p className="text-xs text-textMuted">Pre-configured with authentic variables and guardrails</p>
            </div>
            <button
              onClick={onExploreTemplates}
              className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
            >
              All Templates <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEMPLATES.slice(0, 4).map(tpl => (
              <div
                key={tpl.id}
                onClick={() => onNewCampaign(tpl.inputs)}
                className="p-3.5 rounded-xl border border-borderColor bg-[#FAF9FD] hover:bg-white hover:border-violet-300 hover:shadow-sm cursor-pointer transition flex items-start gap-3"
              >
                <div className="h-9 w-9 rounded-lg bg-violet-surface text-violet-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-midnight truncate">{tpl.name}</h4>
                  <p className="text-[11px] text-textMuted truncate">{tpl.tagline}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-violet-brand bg-white px-2 py-0.5 rounded border border-violet-100">
                    {tpl.inputs.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Format Highlights */}
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-midnight mb-1">Supported UGC Formats</h3>
            <p className="text-xs text-textMuted mb-4">Optimized for high viewer retention</p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FAF9FD] border border-borderColor">
                <span className="font-bold text-midnight">Talking-Head + Demo:</span>
                <p className="text-textMuted text-[11px]">Direct eye contact selfie video with cutaway hands-on texture proof.</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9FD] border border-borderColor">
                <span className="font-bold text-midnight">Day-in-the-Life Routine:</span>
                <p className="text-textMuted text-[11px]">Organic lifestyle integration (morning rush, study break, evening reset).</p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF9FD] border border-borderColor">
                <span className="font-bold text-midnight">Problem–Solution Breakdown:</span>
                <p className="text-textMuted text-[11px]">Names the unspoken daily friction and delivers immediate relief.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenPromptLab}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-violet-surface hover:bg-violet-200 text-violet-brand text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Open Prompt Engineering Lab</span>
          </button>
        </div>
      </div>

      {/* RECENT CAMPAIGNS TABLE */}
      <div className="rounded-2xl border border-borderColor bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-borderColor flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-midnight">Recent Campaigns</h3>
            <p className="text-xs text-textMuted">Open, edit, duplicate, or export your saved ad packages</p>
          </div>
          <button
            onClick={() => onNewCampaign()}
            className="text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            <Wand2 className="h-3.5 w-3.5" />
            <span>Create Campaign</span>
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center text-textMuted">
            <p className="text-sm">No campaigns found.</p>
            <button
              onClick={() => onNewCampaign()}
              className="mt-3 text-xs font-bold text-violet-brand hover:underline"
            >
              Generate your first UGC campaign now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-borderColor">
            {campaigns.map(c => (
              <div
                key={c.id}
                onClick={() => onOpenCampaign(c)}
                className="p-4 sm:p-5 hover:bg-[#FAF9FD] cursor-pointer transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-midnight hover:text-violet-brand transition">
                      {c.title}
                    </h4>
                    {c.isDemo && (
                      <span className="text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded">
                        Demo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-textMuted">
                    <span><strong>Platform:</strong> {c.inputs.platform}</span>
                    <span>•</span>
                    <span><strong>Duration:</strong> {c.inputs.duration}</span>
                    <span>•</span>
                    <span><strong>Objective:</strong> {c.inputs.objective}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs text-textMuted flex items-center gap-1 mr-2 hidden md:flex">
                    <Clock className="h-3 w-3" />
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={(e) => handleDuplicate(e, c.id)}
                    title="Duplicate campaign"
                    className="p-2 rounded-lg text-textMuted hover:bg-violet-surface hover:text-violet-brand transition"
                  >
                    <Copy className="h-4 w-4" />
                  </button>

                  <button
                    onClick={(e) => handleDelete(e, c.id, c.title)}
                    title="Delete campaign"
                    className="p-2 rounded-lg text-textMuted hover:bg-red-50 hover:text-red-600 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => onOpenCampaign(c)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-violet-brand bg-violet-surface hover:bg-violet-200 transition"
                  >
                    <span>View Pack</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
