import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Card accesible, sombra y padding
export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <section
    className={`bg-white dark:bg-neutral-900 rounded-lg shadow p-4 mb-4 ${className}`}
    tabIndex={0}
    role="region"
  >
    {children}
  </section>
);
