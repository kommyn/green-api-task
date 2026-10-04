import { Navigate, Outlet, useNavigate } from "react-router";

import styles from "./ChatsLayout.module.css";
import ChatItem from "./ChatItem";
import { useAppSelector } from "@shared/lib";
import { useGetChatsQuery } from "@entities/chats/api";
import Loader from "@shared/ui/Loader";

export default function ChatsLayout() {
  const user = useAppSelector((state) => state.user.data);
  const chats = useAppSelector((state) => state.chats.items);

  const navigate = useNavigate();

  const { isFetching } = useGetChatsQuery(
    { id: user?.idInstance || "", token: user?.apiTokenInstance || "" },
    {
      skip: !user,
    },
  );

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
          <div className={styles.loader_wrapper}>
            <Loader className={styles.loader} />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}
