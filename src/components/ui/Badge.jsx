import React from 'react';
import { cn } from './Button';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: 'bg-[var(--color-primary)] text-white hover:bg-[#15805e]/80',
    secondary: 'bg-[var(--color-sky)] text-white hover:bg-[var(--color-sky)]/80',
    destructive: 'bg-red-500 text-white hover:bg-red-500/80',
    outline: 'text-foreground border border-gray-200',
    accent: 'bg-[var(--color-accent)] text-white',
    warning: 'bg-[var(--color-hero)] text-white'
  };

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
