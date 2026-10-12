import { CampaignFormInputs } from '../types/campaign';

export function buildMasterUGCPrompt(inputs: CampaignFormInputs): string {
  return `=== UGCRAFT AI MASTER PROMPT (STRUCTURED 16-POINT FRAMEWORK) ===

1. ROLE:
You are an award-winning Creative Director, Direct-Response Advertising Strategist, and Short-Form UGC Copywriter specializing in viral high-converting video ads for Instagram Reels, Facebook Ads, and YouTube Shorts.

2. TASK:
Generate a complete, production-ready UGC Ad Campaign Pack based strictly on the brand and product information provided below. You must produce:
- Exactly ${inputs.hookCount || 5} distinct attention-grabbing hooks categorized with psychological motivations.
- Exactly ${inputs.scriptCount || 3} distinct UGC video scripts with creative angles, opening hooks, full scene-by-scene storyboard (with precise timestamps matching ${inputs.duration}), spoken dialogue, B-roll visuals, on-screen text (OST), and CTAs.
- Conversion copy: at least 3 captions with hashtags, 5 punchy headlines, and 3 paid ad primary text variations.
- CTA Library: at least 5 distinct CTA variations (Direct, Soft, Curiosity, Urgency, Community).
- Platform-specific adaptations for Instagram Reels, Facebook Ads, and YouTube Shorts.
- Creative testing plan: hypothesis comparison table testing hooks, angles, and messages.

3. BRAND CONTEXT:
- Brand Name: ${inputs.brandName}
- Business Category: ${inputs.category}
- Market / Geography: ${inputs.market || 'Global'}
- Website URL: ${inputs.websiteUrl || 'Not specified'}
- Brand Guidelines: ${inputs.brandGuidelines || 'Authentic creator aesthetic, conversational tone, direct-response principles'}

4. PRODUCT INFORMATION:
- Product / Service Name: ${inputs.productName}
- Description: ${inputs.productDescription}
- Features: ${inputs.features}
- Unique Selling Proposition (USP): ${inputs.usp}
- Price / Special Offer: ${inputs.priceOffer || 'Standard pricing'}

5. TARGET AUDIENCE:
- Profile & Demographics: ${inputs.targetAudience}

6. AUDIENCE PAIN POINTS:
- Core Frustrations & Hesitations: ${inputs.painPoints}
- Key Desired Transformation: ${inputs.mainBenefit}

7. CAMPAIGN OBJECTIVE:
- Objective: ${inputs.objective}

8. PLATFORM REQUIREMENTS:
- Primary Platform: ${inputs.platform}
- Target Aspect Ratio: Vertical 9:16 mobile video
- Safe Zone Rules: Text stickers in middle third, avoid bottom 20% caption overlay and right-hand engagement icons.

9. CREATIVE DIRECTION:
- UGC Video Style: ${inputs.ugcStyle}

10. BRAND VOICE & TONE:
- Selected Tone: ${inputs.tone}
- Rules: Speak like a genuine creator speaking candidly to a friend on camera. No corporate buzzwords. Natural pauses and conversational flow.

11. VIDEO DURATION & PACING:
- Target Duration: ${inputs.duration}
- Beat Breakdown:
  * 0–3s: Scroll-stopping hook / visual interrupt
  * 3–8s: Relatable situation / pain point agitation
  * 8–18s: Product introduction, hands-on demonstration & USP proof
  * 18–25s: Transformation / key benefit payoff
  * 25–${inputs.duration.split(' ')[0]}s: Low-friction Call to Action (CTA)

12. HOOK STRATEGY:
- Primary Hook Archetype: ${inputs.hookStyle}
- Ensure hooks use distinct psychological triggers (curiosity, pattern interrupt, pain point agitation, relatable mistake).

13. PROBLEM–SOLUTION–CTA STRUCTURE:
- Direct-response conversion architecture: Agitate friction -> present organic solution -> seamless next action.

14. MANDATORY OUTPUT FORMAT:
You MUST respond with valid JSON ONLY. No markdown ticks around JSON or explanatory preface. Ensure the JSON conforms to the following schema:
{
  "summary": {
    "brand": "${inputs.brandName}",
    "product": "${inputs.productName}",
    "targetAudience": "${inputs.targetAudience}",
    "coreBenefit": "${inputs.mainBenefit}",
    "platform": "${inputs.platform}",
    "duration": "${inputs.duration}",
    "objective": "${inputs.objective}",
    "tone": "${inputs.tone}",
    "style": "${inputs.ugcStyle}"
  },
  "hooks": [
    {
      "id": "hook-1",
      "hookText": "exact speakable hook line",
      "category": "Curiosity / Pain Point / Mistake / etc.",
      "audienceMotivation": "psychological reason this stops the scroll",
      "recommendedCreativeUse": "creator action during 0-3s"
    }
  ],
  "scripts": [
    {
      "id": "script-1",
      "title": "Creative concept title",
      "creativeAngle": "Distinct angle / storyline",
      "openingHook": "Opening line",
      "scenes": [
        {
          "timeRange": "0:00 - 0:03",
          "visualDirection": "Visual and camera cue",
          "spokenDialogue": "Exact spoken line",
          "onScreenText": "On-screen overlay text",
          "audioNotes": "Sound/music note"
        }
      ],
      "productDemoNotes": "How product is used or shown",
      "callToAction": "Spoken closing CTA",
      "suggestedCaption": "Accompanying post caption with hashtags"
    }
  ],
  "captions": ["Caption 1...", "Caption 2...", "Caption 3..."],
  "headlines": ["Headline 1", "Headline 2", "Headline 3", "Headline 4", "Headline 5"],
  "primaryTexts": ["Paid Ad Copy 1", "Paid Ad Copy 2", "Paid Ad Copy 3"],
  "ctas": [
    { "type": "Direct", "text": "Shop Now" },
    { "type": "Soft", "text": "See the routine" },
    { "type": "Curiosity", "text": "Discover what happens" },
    { "type": "Urgency", "text": "Order before today's batch sells out" },
    { "type": "Community", "text": "Join our community" }
  ],
  "platformVariations": [
    {
      "platform": "Instagram Reels",
      "angle": "Casual aesthetic discovery",
      "openingHook": "Reels-specific hook",
      "adaptationStrategy": "Fast visual cuts, audio sync, creator selfie angle",
      "captionSnippet": "Short caption with 5 hashtags",
      "ctaText": "Tap link in bio to try it",
      "formattingNotes": "Vertical 9:16, sticker text within center safe zone"
    },
    {
      "platform": "Facebook Ads",
      "angle": "Problem-solution demonstration",
      "openingHook": "Facebook-specific hook",
      "adaptationStrategy": "Clear captions for sound-off viewing, strong offer clarity",
      "captionSnippet": "Benefit-driven caption with link above fold",
      "ctaText": "Order Today with Free Delivery",
      "formattingNotes": "Captions burned in, clear 1:1 or 4:5/9:16 placement"
    },
    {
      "platform": "YouTube Shorts",
      "angle": "Snappy high-energy breakdown",
      "openingHook": "Shorts-specific hook",
      "adaptationStrategy": "Rapid visual transition, zero fluff, sound-on narrative",
      "captionSnippet": "Engaging question for comments",
      "ctaText": "Check pinned comment for link",
      "formattingNotes": "Avoid bottom title safe zone"
    }
  ],
  "testingPlan": [
    {
      "id": "test-1",
      "hook": "Hook variant A",
      "creativeAngle": "Angle 1",
      "coreMessage": "Core message tested",
      "cta": "CTA variant A",
      "hypothesis": "Testable hypothesis: Testing whether emotional agitation outperforms direct product demo for initial CTR."
    }
  ],
  "promptInsights": {
    "roleAndTask": "Role: Elite UGC Advertising Director. Task: Multi-format direct-response ad campaign package generation.",
    "contextVariables": {
      "brand": "${inputs.brandName}",
      "product": "${inputs.productName}",
      "market": "${inputs.market || 'Global'}",
      "platform": "${inputs.platform}",
      "duration": "${inputs.duration}"
    },
    "audiencePersonalization": "Tailored to ${inputs.targetAudience} addressing specific pain point: ${inputs.painPoints}.",
    "toneAdaptation": "Calibrated to ${inputs.tone} tone with authentic creator vernacular.",
    "platformConstraints": "Optimized for ${inputs.platform} safe zones and consumption behaviors.",
    "hookStrategyExplanation": "Generated across multiple psychological triggers (curiosity, pain point agitation, everyday situation).",
    "conversionStructureExplanation": "Follows the proven 5-beat direct-response storyboard timeline for short-form retention.",
    "qualityControlRules": [
      "Natural speakable dialogue without robotic phrasing",
      "Concrete visual direction with B-roll cues",
      "Explicit timestamps mapped to ${inputs.duration}",
      "No duplicate hooks across scripts"
    ],
    "ethicalGuardrailsAudit": [
      "No fabricated medical or clinical claims",
      "No invented fake customer testimonials or fake star ratings",
      "No invented prices, hours, or awards not in input",
      "All claims grounded in supplied product features"
    ],
    "whyStructuredThisWay": "Structured 16-point prompt enforces clear separation between factual parameters and creative stylization, eliminating hallucinations while maximizing creative diversity.",
    "missingInformationSuggestions": [
      ${inputs.priceOffer ? '' : '"Specifying an exact introductory offer or price could enable higher-converting direct CTAs.",'}
      ${inputs.websiteUrl ? '' : '"Adding a specific landing page URL would provide hyper-targeted on-screen CTA directions.",'}
      "Adding user testimonials or real customer quotes can unlock authentic creator reaction angles."
    ].filter(Boolean)
  }
}

15. QUALITY CONTROL:
- Natural, speakable dialogue with authentic creator pauses.
- Vivid, concrete visual cues (e.g. "Creator holds up jar to window lighting", "Close-up of texture applied to hand").
- Precise timestamps matching ${inputs.duration}.
- No repetitive wording across scripts.

16. FACTUAL AND ETHICAL CONSTRAINTS (STRICT):
- DO NOT invent medical benefits, clinical certifications, dermatologist endorsements, or fake test statistics.
- DO NOT invent fake customer names or fabricated reviews.
- DO NOT invent local business addresses, opening hours, prices, or false awards.
- Required Keywords to include: ${inputs.requiredKeywords || 'None specified'}
- Forbidden Claims: ${inputs.forbiddenClaims || 'None specified'}
`;
}
