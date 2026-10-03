import type { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({ error = false, className, ...props }) => {
  return (
    <input
      className={clsx(styles.input, className, { [styles.error]: error })}
      {...props}
    />
  );
};

export default Input;
