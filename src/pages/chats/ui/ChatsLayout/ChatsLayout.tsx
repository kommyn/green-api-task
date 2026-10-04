import { useEffect, useState, useCallback } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

import styles from "./ChatsLayout.module.css";
import ChatItem from "./ChatItem";
import { useAppSelector } from "@shared/lib";

interface IChatInfo {
  id: string;
  name: string;
}

const generatedChats = Array.from({ length: 20 }).map((_, index) => ({
  id: `${index}`,
  name: `chat-${index + 1}`,
}));

export default function ChatsLayout() {
  const user = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();

  const [chats, setChats] = useState<IChatInfo[]>(generatedChats);

  const getChats = useCallback(async (id: string, token: string) => {
    console.log("get chats called", id, token);

    const response = await fetch(
      `https://4100.api.green-api.com/waInstance${id}/getChats/${token}`,
    );

    if (response.ok) {
      const result = await response.json();
      console.log("result: ", result);
    }
  }, []);

  useEffect(() => {
    if (user) getChats(user.idInstance, user.apiTokenInstance);
  }, [getChats, user]);

  const handleChatClick = (chatId: string) => {
    navigate(`/chats/${chatId}`);
  };

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel_wrapper}>
        <div className={styles.panel}>
          <p className={styles.panel_title}>Список чатов</p>
          <div className={styles.chats_wrapper}>
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chatId={chat.id}
                chatName={chat.name}
                onClick={handleChatClick}
              />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
