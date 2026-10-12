# UGCraft AI — Hook Generation Prompt Architecture

## Purpose
Directs the AI model to engineer attention-grabbing, pattern-interrupting opening hooks (0–3 seconds) specifically optimized for short-form video retention on Instagram Reels, TikTok, and YouTube Shorts.

---

## Psychological Hook Archetypes

1. **Pattern Interrupt / Curiosity**: Breaks mindless thumb-scrolling with unexpected visuals or counter-intuitive statements.
   - *Example:* "Stop applying your moisturizer like this if you actually want all-day glow."
2. **Common Mistake**: Targets user self-doubt and triggers immediate desire to avoid error.
   - *Example:* "The biggest mistake everyone makes when their skin feels tight at 3 PM..."
3. **Visceral Pain Point**: Names the exact unspoken frustration of the target audience.
   - *Example:* "Raise your hand if your moisturizer feels like an oil slick by midday."
4. **Relatable Situation**: Grounded daily reality that triggers instantaneous "That's literally me" resonance.
   - *Example:* "POV: You have 7 minutes to get ready and your skin feels dry and irritated."
5. **Myth vs Reality**: Shatters industry conventions without making unsubstantiated claims.
   - *Example:* "You don't need a 10-step routine for hydrated skin. Here's what actually worked."

---

## Prompt Template
```markdown
Generate at least 5 distinct hooks for {{productName}} by {{brandName}}.
Target Audience: {{targetAudience}}
Audience Pain Points: {{painPoints}}
Tone: {{tone}}

For each hook, output:
- hookText: The exact speakable opening line (under 15 words)
- category: One of [Curiosity, Common Mistake, Pain Point, Question, Unexpected Fact, Product Demonstration, Myth vs Reality, Relatable Situation]
- audienceMotivation: Why this grabs the viewer's psychological attention
- recommendedCreativeUse: Visual direction for the creator during these 3 seconds (e.g., selfie camera zoom, holding texture up to camera)
```
