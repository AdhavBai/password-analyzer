import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Pill } from '../ui/Pill';
import { Divider } from '../ui/Divider';
import { analyzePassword, AnalysisResult } from '@/core/engine';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AnalyzerWidget() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (password) {
      setResult(analyzePassword(password));
    } else {
      setResult(null);
    }
  }, [password]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Weak': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      case 'Strong': return 'text-green-500';
      case 'Very Strong': return 'text-green-600 font-bold';
      default: return 'text-text';
    }
  };

  const getIcon = (classification: string) => {
    switch (classification) {
      case 'Weak': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Medium': return <Shield className="w-5 h-5 text-amber-500" />;
      case 'Strong':
      case 'Very Strong': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      default: return <Shield className="w-5 h-5 text-muted" />;
    }
  };

  return (
    <div className="w-full max-w-xl p-6 md:p-8 rounded-xl border border-border bg-background flex flex-col gap-6 shadow-sm">
      
      <div>
        <h3 className="text-lg font-medium text-text mb-1">Live Evaluation</h3>
        <p className="text-sm text-muted">Type to instantly quantify password entropy and vulnerabilities.</p>
      </div>
      
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter a password to analyze..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-12 font-mono text-lg"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex flex-col gap-6"
          >
            <Divider />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getIcon(result.classification)}
                <span className={cn("text-xl tracking-tight", getClassificationColor(result.classification))}>
                  {result.classification}
                </span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-medium tracking-tighter text-text">
                  {result.score}<span className="text-lg text-muted">/100</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 p-3 rounded-md bg-secondary border border-border">
                <span className="text-xs text-muted uppercase tracking-wider">Entropy</span>
                <span className="text-lg font-medium text-text">{result.entropy} <span className="text-sm font-normal">bits</span></span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-md bg-secondary border border-border">
                <span className="text-xs text-muted uppercase tracking-wider">Crack Time</span>
                <span className="text-lg font-medium text-text">{result.crackTime}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-md bg-secondary border border-border col-span-2 md:col-span-1">
                <span className="text-xs text-muted uppercase tracking-wider">Est. Compute Cost</span>
                <span className="text-lg font-medium text-text">{result.cost}</span>
              </div>
            </div>

            {result.penalties.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <h4 className="text-sm font-medium text-text mb-1">Vulnerabilities Detected</h4>
                <div className="flex flex-col gap-2">
                  {result.penalties.map((penalty, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Pill variant="danger" className="shrink-0 mt-0.5">-{penalty.deduction}</Pill>
                      <span className="text-text">{penalty.message}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
