import type { FC } from "react";

import styles from "./ChatsLayout.module.css";

export interface ChatItemProps {
  chatId: string;
  chatName: string;
  onClick?: (id: string) => void;
}

const ChatItem: FC<ChatItemProps> = ({ chatId, chatName, onClick }) => {
  const handleClick = () => onClick && onClick(chatId);

  return (
    <div className={styles.chat_item} onClick={handleClick}>
      <p>{chatName}</p>
    </div>
  );
};

export default ChatItem;
