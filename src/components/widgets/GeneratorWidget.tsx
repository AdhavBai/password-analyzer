import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Divider } from '../ui/Divider';
import { generatePassword } from '@/core/generators/crypto';
import { calculateEntropy } from '@/core/algorithms/entropy';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GeneratorWidget() {
  const [length, setLength] = useState(24);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [entropy, setEntropy] = useState(0);

  const generate = () => {
    // Need at least one option selected, fallback to lowercase
    const safeOptions = Object.values(options).some(Boolean) 
      ? options 
      : { ...options, lowercase: true };
      
    const pwd = generatePassword({ length, ...safeOptions });
    setPassword(pwd);
    setEntropy(calculateEntropy(pwd));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full max-w-xl p-6 md:p-8 rounded-xl border border-border bg-background flex flex-col gap-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text mb-1">Cryptographic Generator</h3>
          <p className="text-sm text-muted">Generate secure keys with precise constraints.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={generate} className="px-2" title="Regenerate">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative group">
        <div className="w-full min-h-12 p-3 pr-12 rounded-md border border-border bg-secondary font-mono text-lg break-all text-text">
          {password || 'Select options to generate'}
        </div>
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-1.5 text-muted hover:text-text rounded-md hover:bg-border transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text">Length: {length}</span>
          <span className="text-xs text-muted font-mono">{entropy} bits</span>
        </div>
        <input 
          type="range" 
          min="8" 
          max="64" 
          value={length} 
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full accent-text cursor-pointer"
        />
      </div>

      <Divider />

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(options) as Array<keyof typeof options>).map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer group">
            <div className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-colors",
              options[key] ? "bg-text border-text text-background" : "bg-transparent border-border group-hover:border-muted"
            )}>
              {options[key] && <Check className="w-3 h-3" />}
            </div>
            <span className="text-sm text-text capitalize select-none">{key}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
