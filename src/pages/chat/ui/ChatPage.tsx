import type { FC } from "react";
import { useParams } from "react-router";

import styles from "./ChatPage.module.css";

const ChatPage: FC = () => {
  const rar = useParams();
  console.log("rar: ", rar);

  return (
    <div className={styles.container}>
      <div className={styles.chat_wrapper}>Chat here</div>
    </div>
  );
};

export default ChatPage;
