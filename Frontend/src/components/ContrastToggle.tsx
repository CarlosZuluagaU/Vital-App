import React, { useEffect, useState } from 'react';

export const ContrastToggle: React.FC = () => {
  const [hc, setHc] = useState(() => localStorage.getItem('contrast') === 'hc');

  useEffect(() => {
    if (hc) {
      document.documentElement.classList.add('hc');
      localStorage.setItem('contrast', 'hc');
    } else {
      document.documentElement.classList.remove('hc');
      localStorage.setItem('contrast', '');
    }
  }, [hc]);

  return (
    <button
      className={`min-w-[44px] min-h-[44px] rounded px-2 py-1 border ${hc ? 'bg-black text-white' : 'bg-white text-black'} focus:outline focus:outline-2 focus:outline-blue-600`}
      aria-pressed={hc}
      aria-label="Activar/desactivar alto contraste"
      onClick={() => setHc(v => !v)}
    >
      Alto contraste
    </button>
  );
};
