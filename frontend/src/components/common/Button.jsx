import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'text'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full cursor-pointer focus:outline-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider uppercase gap-1.5",
    md: "px-6 py-3 text-sm tracking-wide uppercase gap-2",
    lg: "px-8 py-4 text-base tracking-wider uppercase gap-2.5",
  };

  const variants = {
    primary: {
      background: 'var(--primary-accent)',
      color: '#FFFFFF',
      border: '1px solid var(--primary-accent)',
      boxShadow: '0 4px 14px rgba(239, 106, 91, 0.25)',
    },
    secondary: {
      background: 'var(--soft-peach)',
      color: 'var(--primary-accent)',
      border: '1px solid var(--soft-peach)',
    },
    outline: {
      background: '#FFFFFF',
      color: 'var(--primary-accent)',
      border: '1.5px solid var(--primary-accent)',
    },
    text: {
      background: 'transparent',
      color: 'var(--primary-accent)',
      border: 'none',
      boxShadow: 'none',
      padding: '0',
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      style={{
        ...variants[variant],
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        borderRadius: '9999px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        padding: size === 'sm' ? '0.5rem 1.25rem' : size === 'lg' ? '0.9rem 2.25rem' : '0.75rem 1.75rem',
        fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '0.95rem' : '0.85rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: variant === 'primary' ? '0 8px 24px rgba(239, 106, 91, 0.4)' : '0 4px 15px rgba(239, 106, 91, 0.15)',
        backgroundColor: variant === 'outline' ? 'var(--primary-accent)' : undefined,
        color: variant === 'outline' ? '#FFFFFF' : undefined,
      }}
      whileTap={{ scale: 0.97 }}
      className={`custom-button ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </motion.button>
  );
};
