# UGCraft AI — Video Script Generation Prompt Architecture

## Purpose
Directs the AI to produce at least 3 meaningfully distinct video ad scripts. Each script represents a completely different creative angle (e.g., Problem-Agitation-Solution, Unboxing/Sensory Demo, Day-in-the-Life Routine).

---

## Direct-Response Video Structure

| Timestamp | Phase | Creator Action & Visuals | Sound & Dialogue | On-Screen Text (OST) |
|---|---|---|---|---|
| **0:00 - 0:03** | Hook / Pattern Interrupt | Extreme close-up or sudden movement | Spoken hook line | Bold contrast caption |
| **0:03 - 0:08** | Pain Point / Context | Creator shows relatable struggle | Emotional agitation | Relatable problem tag |
| **0:08 - 0:18** | Product Intro & Demo | Hands-on texture, packaging, usage | Solution revelation & USP | Key feature callout |
| **0:18 - 0:25** | Result / Transformation | Creator demonstrates immediate benefit | Authentic relief / excitement | Core benefit text |
| **0:25 - 0:30** | Call to Action (CTA) | Creator gestures to screen / link | Clear, low-friction next step | Action command & URL |

---

## Script JSON Output Schema Requirement
Every script must strictly provide:
- `id`: unique string
- `title`: Catchy creative concept name
- `creativeAngle`: e.g. "The 30-Second Morning Rush Routine"
- `openingHook`: The exact opening line
- `scenes`: Array of scene objects with:
  - `timeRange`: e.g. "0:00 - 0:03"
  - `visualDirection`: Camera framing, creator expression, B-roll action
  - `spokenDialogue`: Word-for-word speakable lines
  - `onScreenText`: Text overlay
  - `audioNotes`: Music tempo, sound effects, voice tone
- `productDemoNotes`: How the product is showcased organically
- `callToAction`: The concluding spoken CTA
- `suggestedCaption`: Accompanying post caption
