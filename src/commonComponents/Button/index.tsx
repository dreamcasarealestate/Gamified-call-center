import React, { forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-500/90 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30",
  secondary:
    "bg-slate-700/60 text-white hover:bg-slate-700 border border-white/10",
  danger:
    "bg-red-500/90 text-white hover:bg-red-500 shadow-lg shadow-red-500/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-label={typeof children === "string" ? children : undefined}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        )}
        {!isLoading && children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
