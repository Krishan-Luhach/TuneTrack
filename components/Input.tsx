import { Ref } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}
const Input: React.FC<InputProps> = ({
  className,
  type,
  disabled,
  ref,
  ...props
}) => {
return (
    <input
        type={type}
        className={twMerge(
            "flex",
            "w-full",
            "rounded-md",
            "bg-neutral-700",
            "border",
            "border-transparent",
            "px-3",
            "py-3",
            "text-sm",
            "file:border-1",
            "file:px-1.5",
            "file:mr-4",
            "file:rounded-md",
            "file:py-1",
            "file:bg-transparent",
            "file:font-medium",
            "file:text-sm",
            "placeholder:text-neutral-400",
            "disabled:cursor-not-allowed",
            "disabled:opacity-50",
            "focus:outline-none",
            className
        )}
        disabled={disabled}
        ref={ref} 
        {...props}
    />
);
};

export default Input;
