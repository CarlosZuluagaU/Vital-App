import React, { useEffect, useState } from 'react';

const FONT_SIZES = ['sm', 'md', 'lg'] as const;
type FontSize = typeof FONT_SIZES[number];

export const FontSizeToggle: React.FC = () => {
  const [size, setSize] = useState<FontSize>(() => {
    return (localStorage.getItem('fontSize') as FontSize) || 'md';
  });

  useEffect(() => {
    document.documentElement.classList.remove('text-sm', 'text-lg');
    if (size === 'sm') document.documentElement.classList.add('text-sm');
    if (size === 'lg') document.documentElement.classList.add('text-lg');
    localStorage.setItem('fontSize', size);
  }, [size]);

  return (
    <div className="flex gap-2 items-center" role="group" aria-label="Tamaño de fuente">
      {FONT_SIZES.map(f => (
        <button
          key={f}
          className={`min-w-[44px] min-h-[44px] rounded px-2 py-1 border ${size === f ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} focus:outline focus:outline-2 focus:outline-blue-600`}
          aria-pressed={size === f}
          onClick={() => setSize(f)}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
