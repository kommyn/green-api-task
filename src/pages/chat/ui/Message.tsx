import type { FC } from "react";
import clsx from "clsx";

import styles from "./ChatPage.module.css";

export interface MessageProps {
  text: string;
  type: "incoming" | "outgoing";
}

const Message: FC<MessageProps> = ({ text, type }) => {
  const messageClass = type === "incoming" ? styles.incoming : styles.outgoing;

  return <div className={clsx(styles.message, messageClass)}>{text}</div>;
};

export default Message;
