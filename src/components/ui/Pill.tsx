import React from 'react';
import { cn } from '@/lib/utils';

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Pill({ className, variant = 'default', children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-secondary text-text border-border': variant === 'default',
          'bg-green-500/10 text-green-700 border-green-500/20': variant === 'success',
          'bg-amber-500/10 text-amber-700 border-amber-500/20': variant === 'warning',
          'bg-red-500/10 text-red-700 border-red-500/20': variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
