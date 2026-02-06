import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 bg-slate-100 dark:bg-black text-gray-100 font-mono text-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-black border-b border-gray-300">
        <span className="text-xs text-gray-800 dark:text-white uppercase">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre>
          <code className='text-black dark:text-white'>{code}</code>
        </pre>
      </div>
    </div>
  );
}