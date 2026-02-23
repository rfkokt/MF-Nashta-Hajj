import { useState } from 'react';
import type React from 'react';

/** Simple syntax highlighter — tokenizes TSX/JS code into colored spans */
export function highlightCode(code: string): React.ReactNode[] {
  const patterns: [RegExp, string][] = [
    [/\/\/.*$/gm, 'text-neutral-500 italic'],
    [/`[^`]*`/g, 'text-[#a5d6ff]'],
    [/"(?:[^"\\]|\\.)*"/g, 'text-[#a5d6ff]'],
    [/'(?:[^'\\]|\\.)*'/g, 'text-[#a5d6ff]'],
    [/<\/?[A-Z][A-Za-z0-9.]*/g, 'text-[#7ee787]'],
    [/<\/?[a-z][a-z0-9-]*/g, 'text-[#7ee787]'],
    [/\/>/g, 'text-[#7ee787]'],
    [/\b(import|export|from|const|let|var|function|return|if|else|new|typeof|type|interface|extends|implements|class|default|async|await|throw|try|catch|finally|for|while|do|switch|case|break|continue|void|null|undefined|true|false|as)\b/g, 'text-[#ff7b72]'],
    [/\b(React|useState|useEffect|useRef|useMemo|useCallback|ReactNode|FC|JSX|Record|Partial|Pick|Omit|Promise)\b/g, 'text-[#d2a8ff]'],
    [/\b([a-zA-Z-]+)(?==)/g, 'text-[#79c0ff]'],
    [/\b\d+\.?\d*\b/g, 'text-[#ffa657]'],
    [/=>/g, 'text-[#ff7b72]'],
  ];

  type Token = { start: number; end: number; className: string };
  const tokens: Token[] = [];

  for (const [regex, className] of patterns) {
    const r = new RegExp(regex.source, regex.flags);
    let match;
    while ((match = r.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      const overlaps = tokens.some(t => start < t.end && end > t.start);
      if (!overlaps) {
        tokens.push({ start, end, className });
      }
    }
  }

  tokens.sort((a, b) => a.start - b.start);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  tokens.forEach((tok, i) => {
    if (tok.start > cursor) {
      nodes.push(<span key={`t-${i}`}>{code.slice(cursor, tok.start)}</span>);
    }
    nodes.push(<span key={`h-${i}`} className={tok.className}>{code.slice(tok.start, tok.end)}</span>);
    cursor = tok.end;
  });
  if (cursor < code.length) {
    nodes.push(<span key="rest">{code.slice(cursor)}</span>);
  }
  return nodes;
}

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.split('\n');

  return (
    <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-neutral-800 shadow-lg my-3">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-neutral-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <button onClick={handleCopy} className="text-xs text-neutral-500 hover:text-white transition-colors px-2 py-1 rounded hover:bg-neutral-800">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-[#161b22]">
                <td className="select-none text-right pr-4 pl-4 py-0 text-[13px] font-mono text-neutral-600 w-[1%] whitespace-nowrap align-top leading-relaxed">
                  {i + 1}
                </td>
                <td className="pr-4 py-0 text-[13px] font-mono text-[#c9d1d9] whitespace-pre leading-relaxed">
                  {highlightCode(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{title}</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mt-1">{description}</p>
    </div>
  );
}

export function PreviewCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 mb-4">
      {title && <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">{title}</p>}
      {children}
    </div>
  );
}

export function PropsTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="w-full text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <thead className="bg-neutral-50 dark:bg-neutral-900">
          <tr>
            <th className="text-left px-4 py-2 font-medium">Prop</th>
            <th className="text-left px-4 py-2 font-medium">Type</th>
            <th className="text-left px-4 py-2 font-medium">Default</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map(([prop, type, def]) => (
            <tr key={prop}>
              <td className="px-4 py-2"><code>{prop}</code></td>
              <td className="px-4 py-2 text-neutral-500">{type}</td>
              <td className="px-4 py-2 text-neutral-400">{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
