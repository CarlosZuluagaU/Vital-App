import React from 'react';
import { FontSizeToggle } from './FontSizeToggle';
import { ContrastToggle } from './ContrastToggle';

export const Header: React.FC = () => (
  <header className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-blue-700 text-white">
    <div className="flex-1">
      <a href="#main" className="sr-only focus:not-sr-only underline bg-white text-blue-700 px-2 py-1 rounded">Saltar al contenido principal</a>
      <h1 className="text-3xl font-bold" tabIndex={0}>VitalApp</h1>
    </div>
    <div className="flex gap-4 items-center">
      <FontSizeToggle />
      <ContrastToggle />
    </div>
  </header>
);
