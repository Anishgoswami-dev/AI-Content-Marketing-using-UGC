import React, { useState } from 'react';
import { Key, ShieldCheck, AlertCircle, ExternalLink, X, CheckCircle2 } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeyConfigured: boolean;
  onRefreshHealth: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKeyConfigured,
  onRefreshHealth,
}) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/validate-key', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.valid) {
        setTestResult({ success: true, message: data.message || 'API key validated successfully!' });
        onRefreshHealth();
      } else {
        setTestResult({
          success: false,
          message: data.message || 'Key validation failed. Ensure UGC_API_KEY is configured in your server .env file.',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Could not contact server on port 3001. Ensure backend is running.',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-borderColor">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-textMuted hover:bg-violet-surface hover:text-textPrimary transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-surface text-violet-brand">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-textPrimary">Google Gemini API Security</h3>
            <p className="text-sm text-textMuted">Enterprise server-side environment key management</p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-borderColor bg-[#FAF9FD] p-4 text-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-textPrimary">Current Server Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                apiKeyConfigured
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${apiKeyConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
              {apiKeyConfigured ? 'UGC_API_KEY Active' : 'Key Not Configured'}
            </span>
          </div>

          <div className="flex items-start gap-2 text-xs text-textMuted">
            <ShieldCheck className="h-4 w-4 text-violet-brand shrink-0 mt-0.5" />
            <span>
              Your API key is never exposed to the client or browser network logs. It is securely loaded strictly on the Node.js server via the <code className="bg-white px-1.5 py-0.5 rounded border border-borderColor font-mono text-textPrimary">UGC_API_KEY</code> environment variable.
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-semibold text-textPrimary">How to configure your API key:</h4>
          <ol className="list-decimal list-inside space-y-2 text-xs text-textMuted">
            <li>
              Open or create the <code className="bg-violet-surface text-violet-brand px-1.5 py-0.5 rounded font-mono font-medium">.env</code> file in the project root.
            </li>
            <li>
              Add your Google Gemini API key:
              <pre className="mt-1.5 p-2.5 bg-midnight text-gray-200 rounded-lg font-mono text-xs overflow-x-auto">
                UGC_API_KEY=AIzaSy...your_gemini_key_here
              </pre>
            </li>
            <li>
              Restart the backend server (<code className="bg-violet-surface text-violet-brand px-1 py-0.5 rounded font-mono">npm run dev</code>).
            </li>
            <li>
              Click <strong>Test Connection</strong> below to verify live model access.
            </li>
          </ol>
        </div>

        {testResult && (
          <div
            className={`mb-5 p-3 rounded-xl text-xs flex items-start gap-2 border ${
              testResult.success
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-borderColor">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-brand hover:underline"
          >
            Get Gemini API Key <ExternalLink className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestKey}
              disabled={testing}
              className="px-4 py-2 text-xs font-medium bg-violet-surface text-violet-brand hover:bg-violet-200 rounded-xl transition disabled:opacity-50"
            >
              {testing ? 'Verifying...' : 'Test Connection'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium bg-midnight text-white hover:bg-midnight-700 rounded-xl transition shadow"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
