"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border bg-zinc-950 text-zinc-300 shadow-2xl">
      {filename && (
        <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
          <span className="text-xs font-mono text-zinc-500">{filename}</span>
          <button 
            onClick={copyToClipboard}
            className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-500 hover:text-zinc-300"
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      {!filename && (
        <button 
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-500"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      )}
    </div>
  );
}
