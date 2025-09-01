import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

// Botón accesible, tamaño mínimo 44px, foco visible
export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded focus:outline focus:outline-2 focus:outline-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 bg-blue-600 text-white font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);
