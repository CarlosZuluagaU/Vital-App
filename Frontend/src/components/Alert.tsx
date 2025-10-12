import React from 'react';

interface AlertProps {
  children?: React.ReactNode;
  message?: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

// Alerta accesible para errores o mensajes
export const Alert: React.FC<AlertProps> = ({ 
  children, 
  message,
  type = 'error', 
  className = '' 
}) => {
  const typeStyles = {
    success: 'bg-green-100 border-green-400 text-green-800 focus:ring-green-600',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800 focus:ring-yellow-600',
    error: 'bg-red-100 border-red-400 text-red-800 focus:ring-red-600',
    info: 'bg-blue-100 border-blue-400 text-blue-800 focus:ring-blue-600'
  };

  const content = message || children;

  return (
    <div
      className={`${typeStyles[type]} border px-4 py-3 rounded mb-4 text-lg font-semibold focus:outline-none focus:ring-2 ${className}`}
      role="alert"
      tabIndex={0}
      aria-live="polite"
    >
      {content}
    </div>
  );
};
