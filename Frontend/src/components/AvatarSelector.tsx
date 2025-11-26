// 5 avatares por defecto con imágenes
const DEFAULT_AVATARS = [
  { id: 1, image: "/images/Default.png", name: "Default" },
  { id: 2, image: "/images/Caminando.png", name: "Caminando" },
  { id: 3, image: "/images/Estiramiento.png", name: "Estiramiento" },
  { id: 4, image: "/images/Plantas.png", name: "Plantas" },
  { id: 5, image: "/images/Sofa.png", name: "Sofá" },
];

type Props = {
  selectedId: number;
  onSelect: (id: number) => void;
};

export default function AvatarSelector({ selectedId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">🖼️</span>
        <h3 className="text-sm font-semibold text-[var(--fg)] uppercase tracking-wide">
          Elige tu avatar
        </h3>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {DEFAULT_AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedId === avatar.id
                ? 'border-[var(--accent)] bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 shadow-lg shadow-[var(--accent)]/20'
                : 'border-[var(--border)] hover:border-[var(--accent)]/50 hover:shadow-md'
            }`}
            aria-pressed={selectedId === avatar.id}
            title={avatar.name}
          >
            <img 
              src={avatar.image} 
              alt={avatar.name}
              className="w-16 h-16 object-contain mb-1"
            />
            <span className="text-xs text-[var(--fg-muted)]">{avatar.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { DEFAULT_AVATARS };
