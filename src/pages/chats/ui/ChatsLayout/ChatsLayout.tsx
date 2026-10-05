import { Navigate, Outlet, useNavigate } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import styles from "./ChatsLayout.module.css";
import ChatItem from "./ChatItem";
import { useAppSelector } from "@shared/lib";
import Loader from "@shared/ui/Loader";
import { useGetChatsQuery } from "@entities/chats/api";
import { selectUser } from "@entities/user/model";
import { selectChats } from "@entities/chats/model";

export default function ChatsLayout() {
  const user = useAppSelector(selectUser);
  const chats = useAppSelector(selectChats);

  const navigate = useNavigate();

  const { isFetching } = useGetChatsQuery(
    user ? { id: user.idInstance, token: user.apiTokenInstance } : skipToken,
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chats/${chatId}`);
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
        </div>
        {isFetching && (
          <div className={styles.loaderWrapper}>
            <Loader className={styles.loader} />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
