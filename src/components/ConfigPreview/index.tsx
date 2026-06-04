import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import type { ConfigState } from '../../types/config';
import { generateConfig } from '../../lib/proffie/configGenerator';

hljs.registerLanguage('cpp', cpp);

interface Props {
  state: ConfigState;
}

export function ConfigPreview({ state }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const config = generateConfig(state);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute('data-highlighted');
      codeRef.current.textContent = config;
      hljs.highlightElement(codeRef.current);
    }
  }, [config]);

  function handleCopy() {
    navigator.clipboard.writeText(config);
  }

  function handleDownload() {
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.h';
    a.click();
    URL.revokeObjectURL(url);
  }

  const lineCount = config.split('\n').length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500 font-mono">
          config.h · {lineCount} lines
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-xs px-3 py-1.5 rounded-md border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors"
          >
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="text-xs px-3 py-1.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors"
          >
            Download config.h
          </button>
        </div>
      </div>

      {/* Code block */}
      <div className="relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800 bg-slate-900/50">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs text-slate-500 font-mono">config.h</span>
        </div>
        <div className="overflow-auto max-h-[60vh] p-4">
          <pre className="text-xs leading-relaxed">
            <code ref={codeRef} className="language-cpp" />
          </pre>
        </div>
      </div>
    </div>
  );
}
