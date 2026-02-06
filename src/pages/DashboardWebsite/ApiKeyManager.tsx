import { useState } from 'react';
import { Eye, EyeOff, RefreshCw, Copy, Check } from 'lucide-react';
import Button from '@/components/Base/Button';

interface ApiKeyManagerProps {
  projectId: string;
  apiKey: string | null;
  onKeyRegenerated: (newKey: string) => void;
}

export function ApiKeyManager({ apiKey, onKeyRegenerated }: ApiKeyManagerProps) {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    if (window.confirm('Tem certeza? A chave antiga deixará de funcionar imediatamente.')) {
      setRegenerating(true);
      setTimeout(() => {
        onKeyRegenerated('htm_pk_live_' + Math.random().toString(36).substr(2, 10));
        setRegenerating(false);
      }, 1500);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold">Chave de API Pública</h4>
          <p className="text-sm text-gray-500">
            Utilizada para autenticar os eventos enviados pelo seu site.
          </p>
        </div>
        <Button variant="outline-primary" size="sm" onClick={handleRegenerate} disabled={regenerating}>
          <RefreshCw className={`h-4 w-4 mr-2 ${regenerating ? 'animate-spin' : ''}`} />
          Gerar Nova Chave
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showKey ? 'text' : 'password'}
            readOnly
            value={apiKey || ''}
            className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-mono text-gray-600 focus:outline-primary-none"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Button variant="outline-primary" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}