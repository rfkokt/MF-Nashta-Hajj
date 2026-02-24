import { useState, ReactNode } from 'react';
import { Button } from '@nashta/ui-kit';

interface CodeBlockProps {
  codeString: string;
  language?: string;
  children?: ReactNode;
}

export function CodeBlock({ codeString, language = 'bash', children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-neutral-800 shadow-xl my-4">
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/50 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>
        <div className="text-xs text-neutral-500 font-mono tracking-wider uppercase">
          {language}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="text-neutral-400 hover:text-white transition-colors h-7 w-7 p-1 rounded-md hover:bg-neutral-800 flex items-center justify-center bg-transparent"
          aria-label="Copy code"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-500"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-neutral-300">
        {children || (
          <pre>
            <code>{codeString}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
