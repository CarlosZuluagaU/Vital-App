import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

// Alerta accesible para errores o mensajes
export const Alert: React.FC<AlertProps> = ({ children, className = '' }) => (
  <div
    className={`bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded mb-4 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 ${className}`}
    role="alert"
    tabIndex={0}
  >
    {children}
  </div>
);
