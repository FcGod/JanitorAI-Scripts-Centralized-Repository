## 3.2 The Formula: Personality Block Template

A Personality Block is most effective when written as a **structured template of bullet points.** This makes the content concise for humans and easy for the LLM to parse. Each section is a functional instruction, not prose filler.

**Skeleton Template:**

- **CHARACTER:** [Full Name] ([Age]; [Occupation or Role])
    
- **APPEARANCE:** Short, behavior-linked details only (repeatable tells, not beauty-pageant prose)
    
- **PSYCHOLOGICAL_PROFILE:** Motivation, fears, conflicts, validation, vulnerabilities, relevant background
    
- **SOCIAL_BEHAVIOR:** How they banter, dodge, praise, irritate, and disengage
    
- **SENSORY:** Cues tied to sight, sound, scent, touch — small repeatable anchors
    
- **FORMAT:** Define italics, quotes, brackets, bold, and parentheses usage
    

### Sidebar: Why Bullet Points Beat Other Styles

**Prose (inefficient):**  
“Susan Benson is a 22-year-old teacher who is warm and approachable. She reassures her students gently, though she sometimes neglects her own needs. She fiddles with chalk when uncertain.”  
Problem: Full sentences waste tokens. Hedging words like “sometimes” make traits optional.

**JSON (structured but heavy):**  
{  
"Character": {  
"Name": "Susan Benson",  
"Age": 22,  
"Role": "Teacher"  
},  
"Psychological_Profile": {  
"Motivation": "Inspire students",  
"Conflict": "Neglects herself",  
"Vulnerability": "Fidgets with chalk when uncertain"  
}  
}  
Problem: Precise but token-heavy. JSON formatting burns space.

**Bullets (best practice):**

- CHARACTER: Susan Benson (22; Teacher)
    
- MOTIVATION: Inspire students
    
- CONFLICT: Neglects her own needs
    
- VULNERABILITY: Fidgets with chalk when uncertain  
    Advantage: Lean, direct, token-efficient. Exactly what the LLM can act on.
    

### Efficiency Notes

- Keep each bullet under 12–15 words to enforce clarity and token efficiency.
    
- Prioritize PSYCHOLOGICAL_PROFILE and SOCIAL_BEHAVIOR; they drive most behavior. Appearance and Sensory add flavor; Format sets structure.
    
- Don’t duplicate Scenario content (situational state, short-term objectives) here. Personality = stable identity.
    
### Authoritative references for using lists/bullets in prompts

- Microsoft’s Azure OpenAI guidance shows that specifying output structure (e.g., bullet points) can significantly affect quality and demonstrates cues that suggest bullet-point formats. ([Microsoft Learn](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering "Prompt engineering techniques - Azure OpenAI | Microsoft Learn"))
    
- OpenAI’s own best-practices article repeatedly uses and recommends articulating the desired output format (including bullet point lists) through explicit examples. ([OpenAI Help Center](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api?utm_source=chatgpt.com "Best practices for prompt engineering with the OpenAI API"))
