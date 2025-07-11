import { Ref } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  type = "button",
  ref,
  ...props
}) => {
  return (
    <button
      type={type}
      ref = {ref}
      className={twMerge(
        `
        w-full
        rounded-full
        bg-green-500
        px-3
        py-2
        border
        border-transparent
        disabled:cursor-not-allowed
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition`,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Button.displayName = "Button";

export default Button;
