import type { FC } from "react";
import { useParams } from "react-router";

import styles from "./ChatPage.module.css";
import { env } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import TextArea from "@shared/ui/TextArea";
import PlayIcon from "@assets/icons/play-solid-full.svg" ;

const messagesArr = Array.from({ length: 1 }).map(
  (_, index) => `message_${index}`,
);

const ChatPage: FC = () => {
  const { chat_id: chatId } = useParams();

  const chatData = useAppSelector((state) =>
    state.chats.items.find((chat) => chat.chatId === chatId),
  );
  const user = useAppSelector((state) => state.user.data);


  const sendMessage = async () => {
    if (!user) return;
    fetch(
      `${env.apiBase}/waInstance${user.idInstance}/sendMessage/${user.apiTokenInstance}`,
      {
        method: "POST",
        body: JSON.stringify({
          chatId: chatId,
          message: "Hello there",
        }),
      },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.chat_wrapper}>
        <p className={styles.chat_title}>Чат с {chatData?.name}</p>
        <div className={styles.chat_messages}>
          {messagesArr.map((message) => (
            <div key={message}>{message}</div>
          ))}
        </div>
        <div className={styles.chat_controls}>
          <TextArea maxLength={300} />
          <div className={styles.chat_send_wrapper}>
            <button type="button" className={styles.chat_send_button} onClick={sendMessage}>
              <img src={PlayIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
