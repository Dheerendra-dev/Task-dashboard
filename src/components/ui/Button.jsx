import { forwardRef } from "react";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "../../constants/ui";
import { cx } from "../../utils/cx";

const Button = forwardRef(
  (
    {
      type = "button",
      variant = "unstyled",
      size = "none",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "inline-flex items-center justify-center focus:outline-none disabled:pointer-events-none disabled:opacity-50",
          BUTTON_VARIANTS[variant],
          BUTTON_SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
