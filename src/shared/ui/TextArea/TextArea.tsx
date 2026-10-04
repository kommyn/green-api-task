import type { FC, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./TextArea.module.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  return <textarea className={clsx(styles.textarea, className)} {...props} />;
};

export default TextArea;
