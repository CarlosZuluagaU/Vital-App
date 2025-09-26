import React from "react";
import { usePrefs } from "../../context/Preferences";
import type { FontSize } from "../../context/Preferences";

const OPTIONS: {key: FontSize, label: string}[] = [
    { key: "sm", label: "Pequeño" },
    { key: "md", label: "Mediano" },
    { key: "lg", label: "Grande" },
];

const FontSizeSwitcher: React.FC = () => {
    const { fontSize, setFontSize } = usePrefs();

    return (
        <div role="group" aria-label="Tamaño de letra" className="flex gap-2">
            {OPTIONS.map(o => (
                <button 
                key={o.key}
                aria-pressed= {fontSize === o.key}
                onClick={()=> setFontSize(o.key)}
                className={`
                px-3 py-2 rounded-lg min-h-[44px] min-w-[44px]
                border ${fontSize===o.key ? "bg-[var(--accent)] text-[var(--bg)]" : "bg-[var(--card)]"}
                focus-visible:outline
            `}>
                {}
            </button>
            ))}
        </div>
    );
};

export default FontSizeSwitcher;
