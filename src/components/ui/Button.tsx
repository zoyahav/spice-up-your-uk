import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'emerald' | 'amber' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'autumn-btn-primary active:border-b-0 active:translate-y-0.5',
  secondary: 'autumn-btn-secondary active:border-b-0 active:translate-y-0.5',
  emerald: 'autumn-btn-sage active:border-b-0 active:translate-y-0.5',
  amber: 'autumn-btn-ochre active:border-b-0 active:translate-y-0.5',
  danger: 'autumn-btn-cranberry active:border-b-0 active:translate-y-0.5',
  ghost: 'autumn-btn-ghost',
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
