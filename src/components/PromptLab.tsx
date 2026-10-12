import React, { useState } from 'react';
import {
  ShieldCheck,
  Code2,
  Sliders,
  CheckCircle2,
  Copy,
  Wand2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  AlertCircle
} from 'lucide-react';
import { CampaignFormInputs, GeneratedCampaign } from '../types/campaign';
import { buildMasterUGCPrompt } from '../utils/promptBuilder';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from '../data/templates';

interface PromptLabProps {
  currentCampaign?: GeneratedCampaign;
  onGenerateWithCustomPrompt: (inputs: CampaignFormInputs) => Promise<void>;
  isLoading: boolean;
}

export const PromptLab: React.FC<PromptLabProps> = ({
  currentCampaign,
  onGenerateWithCustomPrompt,
  isLoading,
}) => {
  const defaultInputs = currentCampaign?.inputs || GLOWNEST_DEMO_OUTPUT.inputs;

  const [inputs, setInputs] = useState<CampaignFormInputs>(defaultInputs);
  const [customInstructions, setCustomInstructions] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'prompt' | 'variables' | 'schema' | 'checklist' | 'diff'>('prompt');
  const [copied, setCopied] = useState(false);

  // Compute master prompt using the real production builder
  const basePrompt = buildMasterUGCPrompt(inputs);
  const fullPromptWithCustom = customInstructions
    ? `${basePrompt}\n\n[USER CUSTOM PROMPT LAB OVERRIDE INSTRUCTIONS]:\n${customInstructions}`
    : basePrompt;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPromptWithCustom);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    const updatedInputs = {
      ...inputs,
      brandGuidelines: customInstructions
        ? `${inputs.brandGuidelines || ''} | PromptLab Additions: ${customInstructions}`
        : inputs.brandGuidelines,
    };
    await onGenerateWithCustomPrompt(updatedInputs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-borderColor bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderColor">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-surface text-violet-brand text-xs font-bold mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Structured Prompt Architecture Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-midnight">
              Prompt Engineering Studio
            </h1>
            <p className="text-xs sm:text-sm text-textMuted mt-1">
              Inspect variables, tweak system instructions, verify JSON schemas, and test prompt modifications using the live pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputs(GLOWNEST_DEMO_OUTPUT.inputs)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-surface text-violet-brand hover:bg-violet-200 transition"
            >
              Load Skincare Variables
            </button>
            <button
              onClick={() => setInputs(BREW_BEAN_DEMO_OUTPUT.inputs)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-coral-light text-coral-brand hover:bg-coral-100 transition"
            >
              Load Café Variables
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'prompt', label: 'Master Prompt Preview', icon: Code2 },
            { id: 'variables', label: 'Variable Inspector', icon: Sliders },
            { id: 'schema', label: 'JSON Output Schema', icon: Eye },
            { id: 'checklist', label: 'Quality & Ethics Checklist', icon: CheckCircle2 },
            { id: 'diff', label: 'Before & After Comparison', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
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

      {/* SUBTAB CONTENT */}
      {activeSubTab === 'prompt' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-midnight">Production 16-Point Structured Prompt:</span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold text-violet-brand hover:underline flex items-center gap-1"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-midnight text-gray-200 font-mono text-xs whitespace-pre-wrap overflow-x-auto max-h-[500px]">
                {fullPromptWithCustom}
              </pre>
            </div>
          </div>

          {/* Prompt Lab Control Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-midnight">Custom Instruction Injection</h3>
              <p className="text-xs text-textMuted">
                Append custom prompt engineering constraints to test how the model adapts:
              </p>

              <textarea
                rows={4}
                value={customInstructions}
                onChange={e => setCustomInstructions(e.target.value)}
                placeholder="e.g. Ensure all hooks incorporate an Indian college slang nuance or focus heavily on high humidity..."
                className="w-full p-3 rounded-xl border border-borderColor bg-[#FAF9FD] text-xs focus:ring-2 focus:ring-violet-brand/20 focus:outline-none"
              />

              <button
                onClick={handleRun}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-violet-brand hover:bg-violet-hover transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4" />
                <span>{isLoading ? 'Running In Lab...' : 'Test Run Prompt in Generation'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-borderColor bg-[#FAF9FD] p-5 text-xs text-textMuted space-y-2">
              <span className="font-bold text-midnight block">Architecture Note</span>
              <p>
                This studio uses the exact same <code className="text-violet-brand font-mono font-semibold">buildMasterUGCPrompt</code> builder as the backend generation pipeline, guaranteeing zero divergence between preview and execution.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'variables' && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-midnight mb-4">Prompt Variables Inspector</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF9FD] text-textPrimary uppercase tracking-wider text-[10px] border-b border-borderColor">
                <tr>
                  <th className="py-2.5 px-3">Variable Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Current Injected Value</th>
                  <th className="py-2.5 px-3">Role in Generation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">brandName</td>
                  <td className="py-2.5 px-3 text-textMuted">String</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.brandName}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Pins brand identity</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">productName</td>
                  <td className="py-2.5 px-3 text-textMuted">String</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.productName}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Core focus of B-roll &amp; scripts</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">category</td>
                  <td className="py-2.5 px-3 text-textMuted">Enum</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.category}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Contextual industry vocabulary</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">targetAudience</td>
                  <td className="py-2.5 px-3 text-textMuted">String</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.targetAudience}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Calibrates creator persona &amp; slang</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">painPoints</td>
                  <td className="py-2.5 px-3 text-textMuted">String</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.painPoints}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Powers the 0–8s friction agitation</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold text-violet-brand">duration</td>
                  <td className="py-2.5 px-3 text-textMuted">DurationOption</td>
                  <td className="py-2.5 px-3 text-midnight font-sans font-medium">{inputs.duration}</td>
                  <td className="py-2.5 px-3 text-textMuted font-sans">Determines scene timestamp math</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'schema' && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-midnight">Deterministic JSON Schema Output</h3>
          <p className="text-xs text-textMuted">
            The Gemini API is instructed to respond strictly with valid JSON conforming to this specification, ensuring direct rendering in the Results Workspace.
          </p>

          <pre className="p-4 rounded-xl bg-midnight text-gray-200 font-mono text-xs overflow-x-auto whitespace-pre-wrap max-h-96">
{`{
  "summary": { "brand": string, "product": string, "platform": string, "duration": string },
  "hooks": [
    { "id": string, "hookText": string, "category": string, "audienceMotivation": string, "recommendedCreativeUse": string }
  ],
  "scripts": [
    {
      "id": string,
      "title": string,
      "creativeAngle": string,
      "openingHook": string,
      "scenes": [
        { "timeRange": string, "visualDirection": string, "spokenDialogue": string, "onScreenText": string, "audioNotes": string }
      ],
      "productDemoNotes": string,
      "callToAction": string,
      "suggestedCaption": string
    }
  ],
  "captions": string[],
  "headlines": string[],
  "primaryTexts": string[],
  "ctas": [{ "type": "Direct" | "Soft" | "Curiosity" | "Urgency" | "Community", "text": string }],
  "platformVariations": [
    { "platform": string, "angle": string, "openingHook": string, "adaptationStrategy": string, "captionSnippet": string, "ctaText": string, "formattingNotes": string }
  ],
  "testingPlan": [
    { "id": string, "hook": string, "creativeAngle": string, "coreMessage": string, "cta": string, "hypothesis": string }
  ]
}`}
          </pre>
        </div>
      )}

      {activeSubTab === 'checklist' && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-midnight">Quality &amp; Ethical Guardrails Audit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl border border-borderColor bg-[#FAF9FD] space-y-3">
              <h4 className="font-bold text-midnight text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Prompt Structure Guardrails
              </h4>
              <ul className="space-y-2 text-textMuted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Strict JSON schema enforced to eliminate preamble chat.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Exact duration beats explicitly calculated (0-3s, 3-8s, 8-18s, 18-25s, 25-30s).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Visual cues mandate tangible creator camera angles and B-roll instructions.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-borderColor bg-[#FAF9FD] space-y-3">
              <h4 className="font-bold text-midnight text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-violet-brand" />
                Ethical &amp; Factual Guardrails
              </h4>
              <ul className="space-y-2 text-textMuted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Prohibits fabricated clinical testing results or doctor endorsements.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Prohibits fake customer affidavits ("Sarah from NY says...").
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  Prohibits invented local business hours, discounts, or awards.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'diff' && (
        <div className="rounded-2xl border border-borderColor bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-midnight">Before &amp; After Prompt Comparison</h3>
          <p className="text-xs text-textMuted">
            Compare a standard unguided prompt with UGCraft AI’s 16-point structured prompt engineering system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/20 text-xs">
              <h4 className="font-bold text-red-600 mb-2">Before: Naive Prompt</h4>
              <pre className="p-3 bg-white border border-red-200 rounded-lg text-textMuted whitespace-pre-wrap font-mono text-[11px]">
{`Write 3 UGC video ads for GlowNest moisturizer.
Make them catchy and fun. Include a hook and call to action.`}
              </pre>
              <p className="mt-3 text-red-700 text-[11px]">
                Result: Produces exaggerated claims like "Dermatologist approved to cure wrinkles in 3 days", robotic phrasing, and no timestamps or B-roll cues.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 text-xs">
              <h4 className="font-bold text-emerald-700 mb-2">After: UGCraft AI 16-Point Framework</h4>
              <pre className="p-3 bg-white border border-emerald-200 rounded-lg text-textMuted whitespace-pre-wrap font-mono text-[11px] max-h-48 overflow-y-auto">
{`1. ROLE: Award-winning UGC Copywriter
2. TASK: 5 hooks, 3 storyboards, captions...
3. BRAND CONTEXT: ${inputs.brandName}...
4. PRODUCT SPECS: ${inputs.features}...
11. DURATION: ${inputs.duration} (0-3s, 3-8s...)
16. ETHICAL CONSTRAINTS: No fake reviews...`}
              </pre>
              <p className="mt-3 text-emerald-800 text-[11px]">
                Result: Speakable creator rhythm, realistic tissue-blotting B-roll proof, strict adherence to real product attributes, and deterministic JSON.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
