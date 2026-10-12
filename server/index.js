import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateUGCWithGemini } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health and configuration check (NEVER exposes API key secret)
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.UGC_API_KEY && process.env.UGC_API_KEY.trim().length > 5);
  res.json({
    status: 'ok',
    service: 'UGCraft AI API Server',
    apiKeyConfigured: hasKey,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Validate key endpoint
app.post('/api/validate-key', async (req, res) => {
  const apiKey = process.env.UGC_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return res.status(400).json({
      valid: false,
      message: 'UGC_API_KEY is not set in server .env'
    });
  }

  try {
    const testEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const testRes = await fetch(testEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond with: "OK"' }] }]
      })
    });

    if (testRes.ok) {
      return res.json({ valid: true, message: 'Gemini API key is active and connected.' });
    } else {
      const errData = await testRes.json().catch(() => ({}));
      return res.status(400).json({
        valid: false,
        message: errData?.error?.message || 'Invalid API credentials.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      valid: false,
      message: error.message || 'Error validating key'
    });
  }
});

// Generate UGC campaign endpoint
app.post('/api/generate-ugc', async (req, res) => {
  const { prompt, inputs } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({
      error: 'Missing or invalid "prompt" parameter',
      code: 'INVALID_INPUT'
    });
  }

  if (!inputs || !inputs.brandName || !inputs.productName) {
    return res.status(400).json({
      error: 'Inputs must contain at least brandName and productName',
      code: 'INVALID_INPUT'
    });
  }

  try {
    const result = await generateUGCWithGemini(prompt, inputs);
    return res.json({
      success: true,
      data: result.data,
      modelUsed: result.modelUsed,
      isLive: true
    });
  } catch (err) {
    console.error('API Generation Error:', err.message);

    const statusCode = err.code === 'MISSING_API_KEY' ? 401 :
                       err.code === 'INVALID_CREDENTIALS' ? 403 :
                       err.code === 'RATE_LIMIT_EXCEEDED' ? 429 : 500;

    return res.status(statusCode).json({
      success: false,
      error: err.message,
      code: err.code || 'GENERATION_FAILED',
      isLive: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`[UGCraft AI Backend] Server running on http://localhost:${PORT}`);
  const hasKey = Boolean(process.env.UGC_API_KEY && process.env.UGC_API_KEY.trim().length > 5);
  console.log(`[UGCraft AI Backend] Gemini API Key configured: ${hasKey ? 'YES (Live Generation Ready)' : 'NO (Add UGC_API_KEY to .env)'}`);
});
