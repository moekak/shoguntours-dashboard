import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  error ?:boolean;
  required ?:boolean;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className, error = false, required = false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        twMerge(
          "mb-1.5 block text-sm font-medium",
          error ?  "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-400",
          className,
        ),
      )}
    >
      {children}
      {required && (
        <span className="text-red-600 dark:text-red-400 text-xs"> *</span>
      )}
    </label>
  );
};

export default Label;
