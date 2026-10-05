import type { FC } from "react";

import type { IChat } from "@entities/chats/model";

import styles from "./ChatItem.module.css";

export interface ChatItemProps {
  chat: IChat;
  onClick?: (id: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, onClick }) => {
  const handleClick = () => onClick && onClick(chat.chatId);

  return (
    <div className={styles.chatItem} onClick={handleClick}>
      <p className={styles.primary}>{chat.name}</p>
      <p className={styles.secondary}>Тип юзера: {chat.type}</p>
      <p className={styles.secondary}>
        Телефон: {chat.phoneNumber || "Не указан"}
      </p>
      <p className={styles.secondary}>
        Username: {chat.username || "Не указан"}
      </p>
    </div>
  );
};

export default ChatItem;
