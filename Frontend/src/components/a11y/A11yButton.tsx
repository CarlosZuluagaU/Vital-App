import React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    block?: boolean;
    variant?: Variant;
};

export const A11yButton: React.FC<Props> = ({
    block,
    className = "",
    variant = "primary",
    type,
    ...props
}) => {
    const base =
        "inline-flex items-center justify-center rounded-xl px-4 py-2.5 min-w-[44px] min-h-[44px] text-base font-semibold shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-100";

    const stylesByVariant: Record<Variant, string> = {
        primary: "bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80 text-[var(--bg)] hover:shadow-[var(--accent)]/40",
        secondary:
            "bg-[var(--card)] text-[var(--fg)] border-2 border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5",
        ghost: "bg-transparent text-[var(--fg)] hover:bg-[var(--accent)]/10",
    };

    return (
        <button
            type={type ?? "button"}
            {...props}
            className={`${base} ${stylesByVariant[variant]} ${block ? "w-full" : ""} ${className}`}
        />
    );
};
