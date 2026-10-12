import { GeneratedCampaign } from '../types/campaign';
import { GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT } from '../data/templates';

const STORAGE_KEY = 'ugcraft_ai_campaigns_v1';

export const storageService = {
  getCampaigns(): GeneratedCampaign[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Seed with demo campaigns so user immediately has working samples
        const initial = [GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse campaigns from localStorage', e);
      return [GLOWNEST_DEMO_OUTPUT, BREW_BEAN_DEMO_OUTPUT];
    }
  },

  saveCampaign(campaign: GeneratedCampaign): void {
    const list = this.getCampaigns();
    const existingIndex = list.findIndex(c => c.id === campaign.id);
    const updated = { ...campaign, updatedAt: new Date().toISOString() };
    if (existingIndex >= 0) {
      list[existingIndex] = updated;
    } else {
      list.unshift(updated);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  getCampaignById(id: string): GeneratedCampaign | undefined {
    const list = this.getCampaigns();
    return list.find(c => c.id === id);
  },

  deleteCampaign(id: string): void {
    const list = this.getCampaigns();
    const filtered = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  duplicateCampaign(id: string): GeneratedCampaign | null {
    const original = this.getCampaignById(id);
    if (!original) return null;
    const duplicated: GeneratedCampaign = {
      ...original,
      id: 'campaign-' + Date.now(),
      createdAt: new Date().toISOString(),
      title: `${original.title} (Copy)`,
      isDemo: false,
    };
    this.saveCampaign(duplicated);
    return duplicated;
  },

  renameCampaign(id: string, newTitle: string): void {
    const campaign = this.getCampaignById(id);
    if (campaign) {
      campaign.title = newTitle;
      this.saveCampaign(campaign);
    }
  },

  getStats() {
    const list = this.getCampaigns();
    let totalHooks = 0;
    let totalScripts = 0;
    const platforms = new Set<string>();

    list.forEach(c => {
      totalHooks += c.hooks?.length || 0;
      totalScripts += c.scripts?.length || 0;
      if (c.inputs?.platform) platforms.add(c.inputs.platform);
    });

    return {
      totalCampaigns: list.length,
      totalHooks,
      totalScripts,
      uniquePlatforms: platforms.size || 1,
    };
  },

  exportToMarkdown(c: GeneratedCampaign): string {
    let md = `# UGCraft AI Campaign Pack: ${c.title}\n\n`;
    md += `**Brand:** ${c.inputs.brandName} | **Product:** ${c.inputs.productName} | **Category:** ${c.inputs.category}\n`;
    md += `**Target Audience:** ${c.inputs.targetAudience}\n`;
    md += `**Platform:** ${c.inputs.platform} | **Duration:** ${c.inputs.duration} | **Objective:** ${c.inputs.objective}\n`;
    md += `**Tone:** ${c.inputs.tone} | **Style:** ${c.inputs.ugcStyle}\n`;
    md += `**Generated Date:** ${new Date(c.createdAt).toLocaleDateString()}\n\n`;
    md += `---\n\n`;

    md += `## 1. Attention-Grabbing Hooks (${c.hooks.length} Variations)\n\n`;
    c.hooks.forEach((h, i) => {
      md += `### Hook #${i + 1} [${h.category}]\n`;
      md += `> "${h.hookText}"\n\n`;
      md += `- **Audience Motivation:** ${h.audienceMotivation}\n`;
      md += `- **Recommended Creative Direction:** ${h.recommendedCreativeUse}\n\n`;
    });

    md += `---\n\n## 2. UGC Video Ad Scripts (${c.scripts.length} Production Storyboards)\n\n`;
    c.scripts.forEach((s, i) => {
      md += `### Script #${i + 1}: ${s.title}\n`;
      md += `**Creative Angle:** ${s.creativeAngle}\n\n`;
      md += `**Opening Hook:** "${s.openingHook}"\n\n`;
      md += `#### Scene-by-Scene Storyboard:\n\n`;
      md += `| Time | Visual Direction | Spoken Dialogue | On-Screen Text (OST) |\n`;
      md += `|---|---|---|---|\n`;
      s.scenes.forEach(scene => {
        md += `| ${scene.timeRange} | ${scene.visualDirection} | "${scene.spokenDialogue}" | ${scene.onScreenText} |\n`;
      });
      md += `\n**Product Demo Guidance:** ${s.productDemoNotes}\n\n`;
      md += `**Call To Action:** "${s.callToAction}"\n\n`;
      md += `**Suggested Caption:** ${s.suggestedCaption}\n\n`;
      md += `\n`;
    });

    md += `---\n\n## 3. Captions, Headlines & Primary Texts\n\n`;
    md += `### Captions:\n`;
    c.captions.forEach((cap, i) => {
      md += `${i + 1}. ${cap}\n\n`;
    });

    md += `### Headlines:\n`;
    c.headlines.forEach((hl, i) => {
      md += `- ${hl}\n`;
    });
    md += `\n`;

    md += `### Paid Ad Primary Texts:\n`;
    c.primaryTexts.forEach((pt, i) => {
      md += `**Variation ${i + 1}:**\n${pt}\n\n`;
    });

    md += `---\n\n## 4. CTA Library\n\n`;
    c.ctas.forEach(cta => {
      md += `- **[${cta.type}]:** ${cta.text}\n`;
    });
    md += `\n`;

    md += `---\n\n## 5. Platform-Specific Variations\n\n`;
    c.platformVariations.forEach(pv => {
      md += `### ${pv.platform}\n`;
      md += `- **Angle:** ${pv.angle}\n`;
      md += `- **Opening Hook:** "${pv.openingHook}"\n`;
      md += `- **Strategy:** ${pv.adaptationStrategy}\n`;
      md += `- **CTA:** ${pv.ctaText}\n`;
      md += `- **Notes:** ${pv.formattingNotes}\n\n`;
    });

    md += `---\n\n## 6. Creative Testing Plan\n\n`;
    md += `| Test Hook | Creative Angle | Core Message | Call to Action | Testable Hypothesis |\n`;
    md += `|---|---|---|---|---|\n`;
    c.testingPlan.forEach(t => {
      md += `| ${t.hook} | ${t.creativeAngle} | ${t.coreMessage} | ${t.cta} | ${t.hypothesis} |\n`;
    });

    md += `\n\n---\n*Generated by UGCraft AI using 16-point Structured Prompt Engineering Architecture.*`;
    return md;
  },

  exportScriptsToTxt(c: GeneratedCampaign): string {
    let txt = `=======================================================================\n`;
    txt += ` UGC VIDEO AD SCRIPTS - ${c.title.toUpperCase()}\n`;
    txt += ` Brand: ${c.inputs.brandName} | Product: ${c.inputs.productName} | Duration: ${c.inputs.duration}\n`;
    txt += `=======================================================================\n\n`;

    c.scripts.forEach((s, idx) => {
      txt += `-----------------------------------------------------------------------\n`;
      txt += `SCRIPT ${idx + 1}: ${s.title.toUpperCase()}\n`;
      txt += `Angle: ${s.creativeAngle}\n`;
      txt += `Hook: "${s.openingHook}"\n`;
      txt += `-----------------------------------------------------------------------\n\n`;

      s.scenes.forEach(sc => {
        txt += `[${sc.timeRange}]\n`;
        txt += `VISUAL:    ${sc.visualDirection}\n`;
        txt += `DIALOGUE:  "${sc.spokenDialogue}"\n`;
        txt += `ON-SCREEN: [${sc.onScreenText}]\n`;
        if (sc.audioNotes) txt += `AUDIO:     ${sc.audioNotes}\n`;
        txt += `\n`;
      });

      txt += `DEMO NOTES: ${s.productDemoNotes}\n`;
      txt += `CTA:        "${s.callToAction}"\n`;
      txt += `CAPTION:    ${s.suggestedCaption}\n\n\n`;
    });

    return txt;
  },

  downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};
