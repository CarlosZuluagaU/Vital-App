import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {block?: boolean};

export const A11yButton: React.FC<Props> = ({ block, className="", ...props }) => (
    <button
    {...props}
    className={`
        rounded-lg px-4 py-2 min-w-[44px] min-h-[44px]}
        text-base font-medium shadow-sm
        bg-[var(--accent)] text-[var(--bg)] hover:opacity-90
        focus-visible:outline focus-visible:outline-2
        ${block ? "w-full" : ""}
        ${className}
    `}
    />
);