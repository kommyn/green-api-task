import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { useAppSelector } from "@shared/lib";
import Loader from "@shared/ui/Loader";
import Button from "@shared/ui/Button";
import { useGetChatsQuery } from "@entities/chats/api";
import { selectUser } from "@entities/user/model";
import { selectChats } from "@entities/chats/model";

import styles from "./ChatsLayout.module.css";
import ChatItem from "./ChatItem";
import CreateChatModal from "./CreateChatModal";

export default function ChatsLayout() {
  const [isModalOpen, setModalOpen] = useState(false);

  const user = useAppSelector(selectUser);
  const chats = useAppSelector(selectChats);

  const navigate = useNavigate();

  const { isFetching } = useGetChatsQuery(
    user ? { id: user.idInstance, token: user.apiTokenInstance } : skipToken,
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chats/${chatId}`);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <div className={styles.panel}>
          <p className={styles.panelTitle}>Список чатов</p>
          <div className={styles.chatsWrapper}>
            {(chats || []).map((chat) => (
              <ChatItem
                key={chat.chatId}
                chat={chat}
                onClick={handleChatClick}
              />
            ))}
          </div>
          <Button onClick={handleModalOpen}>Создать чат</Button>
        </div>
        {isFetching && (
          <div className={styles.loaderWrapper}>
            <Loader className={styles.loader} />
          </div>
        )}
      </div>
      <Outlet />
      <CreateChatModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
