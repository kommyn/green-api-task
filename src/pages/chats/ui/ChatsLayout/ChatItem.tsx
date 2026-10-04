import type { FC } from "react";

import type { IChat } from "@entities/chats/model";
import styles from "./ChatsLayout.module.css";

export interface ChatItemProps {
  chat: IChat;
  onClick?: (id: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chat, onClick }) => {
  const handleClick = () => onClick && onClick(chat.chatId);

  return (
    <div className={styles.chat_item} onClick={handleClick}>
      <p className={styles.primary_info}>{chat.name}</p>
      <p className={styles.secondary_info}>Тип юзера: {chat.type}</p>
      <p className={styles.secondary_info}>
        Телефон: {chat.phoneNumber || "Не указан"}
      </p>
      <p className={styles.secondary_info}>
        Username: {chat.username || "Не указан"}
      </p>
    </div>
  );
};

export default ChatItem;
