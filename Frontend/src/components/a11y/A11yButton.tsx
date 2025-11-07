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
        "inline-flex items-center justify-center rounded-lg px-4 py-2 min-w-[44px] min-h-[44px] text-base font-medium shadow-sm focus-visible:outline focus-visible:outline-2";

    const stylesByVariant: Record<Variant, string> = {
        primary: "bg-[var(--accent)] text-[var(--bg)] hover:opacity-90",
        secondary:
            "bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] hover:opacity-90",
        ghost: "bg-transparent text-[var(--fg)] hover:opacity-80",
    };

    return (
        <button
            type={type ?? "button"}
            {...props}
            className={`${base} ${stylesByVariant[variant]} ${block ? "w-full" : ""} ${className}`}
        />
    );
};
