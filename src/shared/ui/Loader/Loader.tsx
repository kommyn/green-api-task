import type { CSSProperties, FC } from "react";
import clsx from "clsx";

import styles from "./Loader.module.css";

export interface LoaderProps {
  className?: string;
  style?: CSSProperties;
}

const Loader: FC<LoaderProps> = ({ className, style }) => {
  return <div className={clsx(styles.loader, className)} style={style} />;
};

export default Loader;
