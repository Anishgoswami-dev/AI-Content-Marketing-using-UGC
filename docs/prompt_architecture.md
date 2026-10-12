# UGCraft AI — Prompt Engineering Architecture & Logic

## Executive Summary
UGCraft AI relies on an advanced, structured 16-point prompt engineering pipeline designed to elicit authentic, natural-sounding, high-converting creator-style ad campaigns from Large Language Models (specifically Google Gemini models).

---

## The 16 Pillars of UGC Prompt Architecture

| Pillar | Dimension | Role in Generation |
|---|---|---|
| **1. Role** | Creative Persona | Establishes elite direct-response & UGC director authority. |
| **2. Task** | Deliverables Scope | Specifies exact outputs: hooks, 3 scripts, copy, platform adaptations, testing plan. |
| **3. Brand Context** | Company Identity | Pins down the real brand name, market, and existing guidelines. |
| **4. Product Information** | Offer & Specs | Injects the genuine product details, verified features, and USP. |
| **5. Target Audience** | Demographic & Psychographic | Tailors creator vernacular and persona to resonant subcultures. |
| **6. Pain Points** | Emotional Friction | Supplies the relatable friction necessary for genuine problem-solution narratives. |
| **7. Campaign Objective** | Funnel Positioning | Calibrates whether the goal is low-pressure awareness or high-intent checkout. |
| **8. Platform Requirements** | Formatting Rules | Dictates 9:16 safe zones, sound-on vs sound-off, caption lengths. |
| **9. Creative Direction** | Storytelling Format | Sets format: Talking-head, Unboxing, Day-in-the-Life, Problem-Solution, etc. |
| **10. Brand Voice** | Conversational Register | Ensures natural speech rhythms (e.g. conversational, relatable, funny, bold). |
| **11. Video Duration** | Pacing & Timestamps | Computes beat breakdowns (0-3s, 3-8s, 8-18s, 18-25s, 25-30s). |
| **12. Hook Strategy** | Scroll-Stopping Psychology | Directs AI to generate curiosity, pain point, and relatable hooks. |
| **13. Problem-Solution-CTA** | Direct-Response Anatomy | Enforces the classical conversion arc without sounding like an infomercial. |
| **14. Output Schema** | Deterministic JSON | Mandates strict JSON schema parsing for frontend component rendering. |
| **15. Quality Control** | Polish & Speakability | Enforces speakable cadence, vivid B-roll visual cues, and OST captions. |
| **16. Factual Constraints** | Ethical Guardrails | Strict prohibition against fake reviews, invented specs, and illegal medical claims. |

---

## Why Structured Prompts Outperform Monolithic Prompts
1. **Zero Hallucination of Credentials**: By explicitly isolating factual inputs from creative styling, the LLM does not fabricate clinical certifications or awards.
2. **Deterministic Schema Parsing**: Demanding strict JSON format allows immediate client-side rendering into interactive tabs, copy buttons, and exportable deliverables.
3. **True Platform Adaptation**: Segmenting platform guidelines prevents lazy repetition of identical text across Instagram, Facebook, and YouTube.
