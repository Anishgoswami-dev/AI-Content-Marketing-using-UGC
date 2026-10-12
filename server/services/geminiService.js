import dotenv from 'dotenv';
dotenv.config();

/**
 * Validates and calls Google Gemini API securely using UGC_API_KEY
 */
export async function generateUGCWithGemini(prompt, inputs) {
  const apiKey = process.env.UGC_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    const error = new Error('UGC_API_KEY environment variable is not configured on the server. Please add your API key to .env file.');
    error.code = 'MISSING_API_KEY';
    throw error;
  }

  // Model cascade: try fast & reliable modern Gemini models
  const candidateModels = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
  let lastError = null;

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const systemInstruction = `You are an elite UGC Ad Director and Direct-Response Copywriter. Always respond with pure, valid JSON conforming exactly to the requested schema. Do not wrap with markdown code blocks (such as \`\`\`json). Output pure parseable JSON only.`;

      const requestPayload = {
        contents: [
          {
            parts: [
              {
                text: `${systemInstruction}\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json'
        }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        const errJson = safeParseJson(errorBody);
        const errorMsg = errJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error(`Gemini API Error with model ${model}:`, errorMsg);

        if (response.status === 400 || response.status === 403) {
          const authError = new Error(`Gemini API Authentication/Permission Error: ${errorMsg}`);
          authError.code = 'INVALID_CREDENTIALS';
          throw authError;
        }

        if (response.status === 429) {
          const rateError = new Error(`Gemini API Rate Limit reached: ${errorMsg}`);
          rateError.code = 'RATE_LIMIT_EXCEEDED';
          throw rateError;
        }

        lastError = new Error(errorMsg);
        continue; // Try next candidate model
      }

      const result = await response.json();
      const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error('Gemini returned an empty response candidate');
      }

      // Sanitize JSON text in case model included markdown ticks
      let cleanedText = candidateText.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const parsedOutput = JSON.parse(cleanedText);

      // Validate required output sections
      validateGeneratedOutput(parsedOutput);

      return {
        data: parsedOutput,
        modelUsed: model,
        isLive: true
      };
    } catch (err) {
      if (err.name === 'AbortError') {
        const timeoutErr = new Error('Gemini API request timed out after 45 seconds');
        timeoutErr.code = 'TIMEOUT';
        throw timeoutErr;
      }
      if (err.code === 'MISSING_API_KEY' || err.code === 'INVALID_CREDENTIALS') {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate UGC content using available Gemini models');
}

function safeParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function validateGeneratedOutput(output) {
  if (!output || typeof output !== 'object') {
    throw new Error('Malformed output: Response is not a valid JSON object');
  }

  const missingFields = [];
  if (!Array.isArray(output.hooks) || output.hooks.length < 3) missingFields.push('hooks (min 3)');
  if (!Array.isArray(output.scripts) || output.scripts.length < 2) missingFields.push('scripts (min 2)');
  if (!Array.isArray(output.captions) || output.captions.length < 1) missingFields.push('captions');
  if (!Array.isArray(output.headlines) || output.headlines.length < 1) missingFields.push('headlines');
  if (!Array.isArray(output.ctas) || output.ctas.length < 1) missingFields.push('ctas');

  if (missingFields.length > 0) {
    throw new Error(`Generated response is missing required sections: ${missingFields.join(', ')}`);
  }
}
