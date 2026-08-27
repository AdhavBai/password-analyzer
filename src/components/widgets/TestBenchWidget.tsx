import React from 'react';
import { Pill } from '../ui/Pill';

export function TestBenchWidget() {
  const presets = [
    { label: 'Common Sequence', value: '12345678' },
    { label: 'Keyboard Walk', value: 'qwertyuiop' },
    { label: 'Repeats', value: 'aaaaaabbbbbb' },
    { label: 'Dictionary', value: 'password123' },
  ];

  return (
    <div className="w-full max-w-xl p-6 md:p-8 rounded-xl border border-border bg-background flex flex-col gap-4 shadow-sm">
      <div>
        <h3 className="text-lg font-medium text-text mb-1">Edge-Case Test Bench</h3>
        <p className="text-sm text-muted">Try out common vulnerable patterns.</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {presets.map((preset) => (
          <div key={preset.label} className="flex flex-col gap-1">
            <span className="text-xs text-muted">{preset.label}</span>
            <div className="px-3 py-1.5 bg-secondary border border-border rounded-md font-mono text-sm text-text cursor-not-allowed select-all">
              {preset.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
