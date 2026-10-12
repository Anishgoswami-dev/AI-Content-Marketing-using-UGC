import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Printer,
  Edit3,
  Save,
  RotateCcw,
  Zap,
  Video,
  FileText,
  Sliders,
  ShieldCheck,
  Share2,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { GeneratedCampaign, VideoScript, HookItem } from '../types/campaign';
import { storageService } from '../services/storageService';

interface ResultsWorkspaceProps {
  campaign: GeneratedCampaign;
  onUpdateCampaign: (updated: GeneratedCampaign) => void;
  onRegenerate: () => Promise<void>;
  isRegenerating: boolean;
  onOpenPromptLab: () => void;
}

export const ResultsWorkspace: React.FC<ResultsWorkspaceProps> = ({
  campaign,
  onUpdateCampaign,
  onRegenerate,
  isRegenerating,
  onOpenPromptLab,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'hooks' | 'scripts' | 'captions' | 'ctas' | 'platforms' | 'testing' | 'prompt'
  >('overview');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Editable local state
  const [editableCampaign, setEditableCampaign] = useState<GeneratedCampaign>(campaign);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = () => {
    const md = storageService.exportToMarkdown(editableCampaign);
    handleCopy(md, 'all');
  };

  const handleSaveToLocalStorage = () => {
    storageService.saveCampaign(editableCampaign);
    onUpdateCampaign(editableCampaign);
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportMarkdown = () => {
    const md = storageService.exportToMarkdown(editableCampaign);
    storageService.downloadFile(
      md,
      `${editableCampaign.inputs.brandName.toLowerCase()}_ugc_campaign.md`,
      'text/markdown'
    );
  };

  const handleExportTxt = () => {
    const txt = storageService.exportScriptsToTxt(editableCampaign);
    storageService.downloadFile(
      txt,
      `${editableCampaign.inputs.brandName.toLowerCase()}_scripts.txt`,
      'text/plain'
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* CAMPAIGN HEADER */}
      <div className="rounded-3xl border border-borderColor bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-borderColor">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2.5 py-1 rounded-md border border-violet-200">
                {editableCampaign.inputs.category}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-offwhite text-textMuted px-2.5 py-1 rounded-md border border-borderColor">
                {editableCampaign.inputs.platform}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-offwhite text-textMuted px-2.5 py-1 rounded-md border border-borderColor flex items-center gap-1">
                <Clock className="h-3 w-3" /> {editableCampaign.inputs.duration}
              </span>
              {editableCampaign.isDemo && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                  Demo Mode (Verified Benchmark)
                </span>
              )}
            </div>

            {editMode ? (
              <input
                type="text"
                value={editableCampaign.title}
                onChange={e => setEditableCampaign({ ...editableCampaign, title: e.target.value })}
                className="text-2xl sm:text-3xl font-extrabold text-midnight border-b-2 border-violet-brand focus:outline-none w-full max-w-xl"
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold text-midnight">
                {editableCampaign.title}
              </h1>
            )}

            <p className="text-xs sm:text-sm text-textMuted mt-1">
              <strong>Objective:</strong> {editableCampaign.inputs.objective} • <strong>Tone:</strong> {editableCampaign.inputs.tone} • <strong>Style:</strong> {editableCampaign.inputs.ugcStyle}
            </p>
          </div>

          {/* ACTIONS TOOLBAR */}
          <div className="flex flex-wrap items-center gap-2">
            {editMode ? (
              <button
                onClick={handleSaveToLocalStorage}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-borderColor hover:bg-violet-surface text-textPrimary transition"
              >
                <Edit3 className="h-3.5 w-3.5 text-violet-brand" />
                <span>Edit Mode</span>
              </button>
            )}

            <button
              onClick={handleSaveToLocalStorage}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-brand hover:bg-violet-hover text-white shadow-sm transition"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save Campaign'}</span>
            </button>

            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-borderColor hover:bg-violet-surface text-textPrimary transition"
            >
              {copiedKey === 'all' ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-violet-brand" />}
              <span>{copiedKey === 'all' ? 'Copied All!' : 'Copy All'}</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              title="Download as Markdown"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-borderColor hover:bg-violet-surface text-textPrimary transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Markdown</span>
            </button>

            <button
              onClick={handleExportTxt}
              title="Download scripts plain text"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-borderColor hover:bg-violet-surface text-textPrimary transition"
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Scripts .txt</span>
            </button>

            <button
              onClick={handlePrint}
              title="Print Campaign"
              className="p-2 rounded-xl text-textMuted border border-borderColor hover:bg-gray-100 transition hidden sm:flex"
            >
              <Printer className="h-4 w-4" />
            </button>

            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-midnight text-white hover:bg-midnight-700 transition disabled:opacity-50"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Layers },
            { id: 'hooks', label: `Hooks (${editableCampaign.hooks.length})`, icon: Zap },
            { id: 'scripts', label: `Video Scripts (${editableCampaign.scripts.length})`, icon: Video },
            { id: 'captions', label: 'Captions & Headlines', icon: FileText },
            { id: 'ctas', label: 'CTA Library', icon: ArrowRight },
            { id: 'platforms', label: 'Platform Variations', icon: Share2 },
            { id: 'testing', label: 'Testing Plan', icon: Sliders },
            { id: 'prompt', label: 'Prompt Insights', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-violet-surface text-violet-brand border border-violet-200 shadow-sm'
                    : 'text-textMuted hover:text-textPrimary hover:bg-gray-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-midnight mb-4">Campaign Strategy Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs mb-6">
                <div className="p-3 rounded-xl bg-[#FAF9FD] border border-borderColor">
                  <span className="text-textMuted block mb-1">Target Audience</span>
                  <strong className="text-textPrimary">{editableCampaign.summary.targetAudience}</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9FD] border border-borderColor">
                  <span className="text-textMuted block mb-1">Core Benefit Payoff</span>
                  <strong className="text-textPrimary">{editableCampaign.summary.coreBenefit}</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9FD] border border-borderColor">
                  <span className="text-textMuted block mb-1">Creator Vernacular</span>
                  <strong className="text-textPrimary">{editableCampaign.summary.tone}</strong>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <strong className="text-textPrimary">Product Specifications:</strong>
                  <p className="text-textMuted mt-0.5">{editableCampaign.inputs.features}</p>
                </div>
                <div>
                  <strong className="text-textPrimary">Unique Selling Proposition (USP):</strong>
                  <p className="text-textMuted mt-0.5">{editableCampaign.inputs.usp}</p>
                </div>
                <div>
                  <strong className="text-textPrimary">Audience Friction / Pain Points:</strong>
                  <p className="text-textMuted mt-0.5">{editableCampaign.inputs.painPoints}</p>
                </div>
              </div>
            </div>

            {/* Quick Preview of Top Hook & Script 1 */}
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-midnight">Featured Lead Concept</h4>
                <button
                  onClick={() => setActiveTab('scripts')}
                  className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
                >
                  View All {editableCampaign.scripts.length} Scripts <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {editableCampaign.scripts[0] && (
                <div className="p-4 rounded-xl bg-[#FAF9FD] border border-borderColor">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-violet-brand bg-violet-surface px-2 py-0.5 rounded">
                    {editableCampaign.scripts[0].creativeAngle}
                  </span>
                  <h5 className="text-base font-bold text-midnight mt-1.5 mb-2">
                    {editableCampaign.scripts[0].title}
                  </h5>
                  <p className="text-xs font-semibold text-textPrimary italic mb-2">
                    Opening Hook: "{editableCampaign.scripts[0].openingHook}"
                  </p>
                  <p className="text-xs text-textMuted line-clamp-2">
                    {editableCampaign.scripts[0].scenes[0]?.visualDirection}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Deliverables Checklist Side Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <h4 className="text-sm font-bold text-midnight mb-4">Generated Deliverables Pack</h4>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Opening Hooks
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.hooks.length} variations</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Video Ad Scripts
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.scripts.length} storyboards</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Feed Captions
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.captions.length} crafted</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Paid Ad Headlines
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.headlines.length} headlines</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Call to Action Library
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.ctas.length} angles</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Platform Adaptations
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.platformVariations.length} platforms</strong>
                </li>
                <li className="flex items-center justify-between text-textPrimary">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Creative Testing Plan
                  </span>
                  <strong className="font-mono text-violet-brand">{editableCampaign.testingPlan.length} tests</strong>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-borderColor bg-[#FAF9FD] p-5 text-xs text-textMuted space-y-2">
              <div className="flex items-center gap-2 text-midnight font-bold">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Ethical Guardrails Verified</span>
              </div>
              <p>
                No unverified medical claims, invented clinical trials, or fabricated customer reviews were permitted during prompt execution.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOOKS */}
      {activeTab === 'hooks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-midnight">Scroll-Stopping Hooks ({editableCampaign.hooks.length})</h3>
              <p className="text-xs text-textMuted">First 0–3 seconds designed to halt passive scrolling with distinct psychological triggers.</p>
            </div>
            <button
              onClick={() => handleCopy(editableCampaign.hooks.map((h, i) => `${i + 1}. [${h.category}] "${h.hookText}"`).join('\n'), 'all_hooks')}
              className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>{copiedKey === 'all_hooks' ? 'Copied All Hooks!' : 'Copy All Hooks'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editableCampaign.hooks.map((hook, index) => (
              <div
                key={hook.id}
                className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm hover:border-violet-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2.5 py-1 rounded-md">
                      {hook.category}
                    </span>
                    <span className="text-xs text-textMuted font-mono">Hook #{index + 1}</span>
                  </div>

                  {editMode ? (
                    <textarea
                      rows={2}
                      value={hook.hookText}
                      onChange={e => {
                        const newHooks = [...editableCampaign.hooks];
                        newHooks[index].hookText = e.target.value;
                        setEditableCampaign({ ...editableCampaign, hooks: newHooks });
                      }}
                      className="w-full p-2 border border-borderColor rounded-xl text-sm font-bold text-midnight focus:ring-1 focus:ring-violet-brand"
                    />
                  ) : (
                    <p className="text-base font-bold text-midnight mb-3 leading-snug">
                      "{hook.hookText}"
                    </p>
                  )}

                  <div className="space-y-1.5 text-xs text-textMuted mb-4">
                    <p>
                      <strong className="text-textPrimary">Audience Motivation:</strong> {hook.audienceMotivation}
                    </p>
                    <p>
                      <strong className="text-textPrimary">Creative Direction:</strong> {hook.recommendedCreativeUse}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-borderColor flex items-center justify-between text-xs">
                  <span className="text-[11px] text-textMuted font-medium">0–3 Seconds Pacing</span>
                  <button
                    onClick={() => handleCopy(hook.hookText, hook.id)}
                    className="flex items-center gap-1 font-bold text-violet-brand hover:underline"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copiedKey === hook.id ? 'Copied' : 'Copy Hook'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VIDEO SCRIPTS */}
      {activeTab === 'scripts' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-midnight">Production Video Scripts ({editableCampaign.scripts.length})</h3>
              <p className="text-xs text-textMuted">Each script explores a distinct creative angle with scene-by-scene timing, dialogue &amp; B-roll.</p>
            </div>
            <button
              onClick={handleExportTxt}
              className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export All Scripts (.txt)</span>
            </button>
          </div>

          {editableCampaign.scripts.map((script, scriptIdx) => (
            <div key={script.id} className="rounded-2xl border border-borderColor bg-white shadow-sm overflow-hidden">
              <div className="bg-[#FAF9FD] p-6 border-b border-borderColor flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2.5 py-1 rounded-md">
                      Script #{scriptIdx + 1}
                    </span>
                    <span className="text-xs font-semibold text-textMuted">
                      Angle: {script.creativeAngle}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-midnight">{script.title}</h4>
                  <p className="text-xs font-medium text-textPrimary mt-1">
                    Opening Hook: <span className="italic">"{script.openingHook}"</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const fullScript = `TITLE: ${script.title}\nANGLE: ${script.creativeAngle}\nHOOK: ${script.openingHook}\n\n` +
                        script.scenes.map(s => `[${s.timeRange}]\nVISUAL: ${s.visualDirection}\nDIALOGUE: "${s.spokenDialogue}"\nOST: ${s.onScreenText}`).join('\n\n') +
                        `\n\nCTA: "${script.callToAction}"\nCAPTION: ${script.suggestedCaption}`;
                      handleCopy(fullScript, script.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-borderColor text-violet-brand hover:bg-violet-surface transition"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{copiedKey === script.id ? 'Copied Full Script!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>

              {/* Scene Storyboard Table */}
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF9FD] text-textPrimary uppercase tracking-wider text-[10px] border-b border-borderColor">
                    <tr>
                      <th className="py-3 px-3 w-24">Timestamp</th>
                      <th className="py-3 px-3 w-1/3">Visual Direction &amp; B-Roll</th>
                      <th className="py-3 px-3 w-1/3">Spoken Creator Dialogue</th>
                      <th className="py-3 px-3">On-Screen Text (OST)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderColor">
                    {script.scenes.map((scene, sIdx) => (
                      <tr key={sIdx} className="hover:bg-violet-light/30 transition">
                        <td className="py-3.5 px-3 font-mono font-bold text-violet-brand align-top">
                          {scene.timeRange}
                        </td>
                        <td className="py-3.5 px-3 text-textPrimary align-top">
                          {scene.visualDirection}
                          {scene.audioNotes && (
                            <div className="text-[10px] text-textMuted mt-1 italic">
                              🎵 {scene.audioNotes}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-midnight align-top">
                          "{scene.spokenDialogue}"
                        </td>
                        <td className="py-3.5 px-3 font-medium text-coral-brand align-top">
                          {scene.onScreenText}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Script Footer Notes */}
              <div className="bg-[#FAF9FD] px-6 py-4 border-t border-borderColor flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-textPrimary">Product Demo Notes: </span>
                  <span className="text-textMuted">{script.productDemoNotes}</span>
                </div>
                <div>
                  <span className="font-bold text-textPrimary">Closing CTA: </span>
                  <span className="text-violet-brand font-semibold">"{script.callToAction}"</span>
                </div>
              </div>

              <div className="px-6 py-3 bg-white border-t border-borderColor text-xs flex items-center justify-between">
                <div className="truncate max-w-2xl">
                  <span className="font-bold text-textPrimary">Suggested Caption: </span>
                  <span className="text-textMuted">{script.suggestedCaption}</span>
                </div>
                <button
                  onClick={() => handleCopy(script.suggestedCaption, `${script.id}-cap`)}
                  className="text-violet-brand font-bold hover:underline shrink-0 ml-2"
                >
                  {copiedKey === `${script.id}-cap` ? 'Copied' : 'Copy Caption'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: CAPTIONS & HEADLINES */}
      {activeTab === 'captions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Captions */}
          <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-midnight">Feed Captions ({editableCampaign.captions.length})</h3>
            <div className="space-y-4">
              {editableCampaign.captions.map((cap, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF9FD] border border-borderColor text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-violet-brand">Variation #{i + 1}</span>
                    <button
                      onClick={() => handleCopy(cap, `cap-${i}`)}
                      className="text-violet-brand font-bold hover:underline flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedKey === `cap-${i}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-textPrimary leading-relaxed whitespace-pre-line">{cap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Headlines & Paid Texts */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-midnight mb-3">
                High-CTR Headlines ({editableCampaign.headlines.length})
              </h3>
              <div className="space-y-2">
                {editableCampaign.headlines.map((hl, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#FAF9FD] border border-borderColor text-xs flex items-center justify-between">
                    <span className="font-bold text-textPrimary">{hl}</span>
                    <button
                      onClick={() => handleCopy(hl, `hl-${i}`)}
                      className="text-violet-brand font-bold hover:underline ml-2"
                    >
                      {copiedKey === `hl-${i}` ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-midnight mb-3">
                Paid Ad Primary Texts ({editableCampaign.primaryTexts.length})
              </h3>
              <div className="space-y-3">
                {editableCampaign.primaryTexts.map((pt, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF9FD] border border-borderColor text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-textMuted">Ad Copy Option #{i + 1}</span>
                      <button
                        onClick={() => handleCopy(pt, `pt-${i}`)}
                        className="text-violet-brand font-bold hover:underline"
                      >
                        {copiedKey === `pt-${i}` ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-textPrimary leading-relaxed">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CTA LIBRARY */}
      {activeTab === 'ctas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-midnight">Call to Action (CTA) Library ({editableCampaign.ctas.length})</h3>
              <p className="text-xs text-textMuted">Psychologically distinct CTA variations ranging from friction-free exploration to direct checkout.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {editableCampaign.ctas.map((cta, i) => (
              <div key={i} className="rounded-2xl border border-borderColor bg-white p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-surface text-violet-brand px-2 py-0.5 rounded">
                    {cta.type} Angle
                  </span>
                  <p className="text-base font-bold text-midnight mt-3 mb-2">
                    "{cta.text}"
                  </p>
                </div>
                <div className="pt-3 border-t border-borderColor flex justify-end">
                  <button
                    onClick={() => handleCopy(cta.text, `cta-${i}`)}
                    className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
                  >
                    <Copy className="h-3 w-3" />
                    <span>{copiedKey === `cta-${i}` ? 'Copied' : 'Copy CTA'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: PLATFORM VARIATIONS */}
      {activeTab === 'platforms' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editableCampaign.platformVariations.map((pv, i) => (
            <div key={i} className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-midnight">{pv.platform}</h4>
                  <span className="text-[10px] font-bold bg-violet-surface text-violet-brand px-2 py-0.5 rounded">
                    Native Custom
                  </span>
                </div>

                <div className="space-y-3 text-xs mb-4">
                  <div>
                    <span className="font-bold text-textMuted block">Creative Angle:</span>
                    <strong className="text-textPrimary">{pv.angle}</strong>
                  </div>
                  <div>
                    <span className="font-bold text-textMuted block">Platform Hook:</span>
                    <p className="font-semibold text-midnight italic mt-0.5">"{pv.openingHook}"</p>
                  </div>
                  <div>
                    <span className="font-bold text-textMuted block">Pacing &amp; Audio Strategy:</span>
                    <p className="text-textMuted mt-0.5">{pv.adaptationStrategy}</p>
                  </div>
                  <div>
                    <span className="font-bold text-textMuted block">Suggested CTA:</span>
                    <p className="font-bold text-violet-brand mt-0.5">{pv.ctaText}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-borderColor flex items-center justify-between text-xs">
                <span className="text-[10px] text-textMuted">{pv.formattingNotes}</span>
                <button
                  onClick={() => handleCopy(`[${pv.platform}]\nHOOK: ${pv.openingHook}\nCTA: ${pv.ctaText}\nSTRATEGY: ${pv.adaptationStrategy}`, `plat-${i}`)}
                  className="font-bold text-violet-brand hover:underline shrink-0 ml-2"
                >
                  {copiedKey === `plat-${i}` ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: CREATIVE TESTING PLAN */}
      {activeTab === 'testing' && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-midnight">Creative Testing Hypotheses Matrix</h3>
            <p className="text-xs text-textMuted">Structured testing framework to run isolated A/B variations across hooks, angles, and CTAs without guesswork.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF9FD] text-textPrimary uppercase tracking-wider text-[10px] border-b border-borderColor">
                <tr>
                  <th className="py-3 px-3">Test Variant Hook</th>
                  <th className="py-3 px-3">Creative Angle</th>
                  <th className="py-3 px-3">Core Message</th>
                  <th className="py-3 px-3">Call to Action</th>
                  <th className="py-3 px-3">Testable Hypothesis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor">
                {editableCampaign.testingPlan.map(t => (
                  <tr key={t.id} className="hover:bg-violet-light/30 transition">
                    <td className="py-3.5 px-3 font-bold text-midnight align-top">{t.hook}</td>
                    <td className="py-3.5 px-3 text-textMuted align-top">{t.creativeAngle}</td>
                    <td className="py-3.5 px-3 text-textPrimary align-top">{t.coreMessage}</td>
                    <td className="py-3.5 px-3 font-semibold text-violet-brand align-top">{t.cta}</td>
                    <td className="py-3.5 px-3 text-textMuted italic align-top">{t.hypothesis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: PROMPT INSIGHTS */}
      {activeTab === 'prompt' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-midnight">Structured Prompt Engineering Logic</h3>
                <p className="text-xs text-textMuted">How the 16-point framework constructed the prompt without hallucinations</p>
              </div>
              <button
                onClick={onOpenPromptLab}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover transition flex items-center gap-1.5"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Open in Prompt Lab</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-4 rounded-xl bg-[#FAF9FD] border border-borderColor space-y-2">
                <strong className="text-midnight block">Role &amp; Task Authority:</strong>
                <p className="text-textMuted">{editableCampaign.promptInsights.roleAndTask}</p>
                <strong className="text-midnight block pt-2">Why Structured This Way:</strong>
                <p className="text-textMuted">{editableCampaign.promptInsights.whyStructuredThisWay}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9FD] border border-borderColor space-y-2">
                <strong className="text-midnight block">Quality Control Safeguards:</strong>
                <ul className="space-y-1 list-disc list-inside text-textMuted">
                  {editableCampaign.promptInsights.qualityControlRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>

                <strong className="text-midnight block pt-2">Ethical Guardrails Audit:</strong>
                <ul className="space-y-1 list-disc list-inside text-emerald-700">
                  {editableCampaign.promptInsights.ethicalGuardrailsAudit.map((audit, idx) => (
                    <li key={idx}>{audit}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inspectable Raw Prompt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-midnight">Sanitized Master Prompt Input (Excluding Secrets):</span>
                <button
                  onClick={() => handleCopy(editableCampaign.promptInsights.sanitizedRawPrompt, 'raw_prompt')}
                  className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedKey === 'raw_prompt' ? 'Copied' : 'Copy Master Prompt'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-midnight text-gray-200 text-xs font-mono overflow-x-auto max-h-72 whitespace-pre-wrap">
                {editableCampaign.promptInsights.sanitizedRawPrompt}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
