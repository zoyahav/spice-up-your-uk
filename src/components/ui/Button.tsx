import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'emerald' | 'amber' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white border-b-4 border-rose-800 active:border-b-0 active:translate-y-1 shadow-md shadow-pink-950/30',
  secondary:
    'bg-slate-800 hover:bg-slate-700 text-slate-100 border-b-4 border-slate-950 active:border-b-0 active:translate-y-1',
  emerald:
    'bg-emerald-600 hover:bg-emerald-500 text-white border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1',
  amber:
    'bg-amber-500 hover:bg-amber-400 text-slate-950 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1',
  danger:
    'bg-rose-600 hover:bg-rose-500 text-white border-b-4 border-rose-900 active:border-b-0 active:translate-y-1',
  ghost:
    'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-slate-700/70',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-xs rounded-xl font-bold',
  md: 'px-4 py-2.5 text-sm rounded-2xl font-bold',
  lg: 'px-5 py-3.5 text-base rounded-2xl font-extrabold',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all select-none disabled:pointer-events-none disabled:opacity-45 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
