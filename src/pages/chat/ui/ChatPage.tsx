import { useMemo, type FC } from "react";
import { useParams } from "react-router";

import { env } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import TextArea from "@shared/ui/TextArea";
import PlayIcon from "@assets/icons/play-solid-full.svg";
import { useGetLastChatMessagesQuery } from "@entities/messages/api";
import styles from "./ChatPage.module.css";
import Message from "./Message";

const ChatPage: FC = () => {
  const { chat_id: chatId } = useParams();

  const chatData = useAppSelector((state) =>
    state.chats.items.find((chat) => chat.chatId === chatId),
  );
  const user = useAppSelector((state) => state.user.data);

  const { data } = useGetLastChatMessagesQuery(
    {
      id: user?.idInstance || "",
      token: user?.apiTokenInstance || "",
      chatId: chatId || "",
    },
    {
      skip: !user || !chatId,
    },
  );

  const processedMessages = useMemo(() => {
    if (!data) return [];

    return data
      .filter((message) => message.typeMessage === "textMessage")
      .reverse();
  }, [data]);

  console.log("processedMessages: ", processedMessages);

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
          {processedMessages.map((message) => (
            <Message
              key={message.idMessage}
              text={message.textMessage}
              type={message.type}
            />
          ))}
        </div>
        <div className={styles.chat_controls}>
          <TextArea maxLength={300} />
          <div className={styles.chat_send_wrapper}>
            <button
              type="button"
              className={styles.chat_send_button}
              onClick={sendMessage}
            >
              <img src={PlayIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
