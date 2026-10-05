import { useState, type FC } from "react";
import { useParams } from "react-router";

import styles from "./ChatPage.module.css";
import { useGetLastChatMessages } from "../lib";
import Message from "./Message";
import { useAppSelector } from "@shared/lib";
import TextArea from "@shared/ui/TextArea";
import { useSendMessageMutation } from "@entities/messages/api";
import { selectChatById } from "@entities/chats/model";
import { selectUser } from "@entities/user/model";
import PlayIcon from "@assets/icons/play-solid-full.svg";

const ChatPage: FC = () => {
  const { chatId } = useParams();

  const [messageText, setMessageText] = useState("");

  const chatData = useAppSelector((state) => selectChatById(state, chatId));
  const user = useAppSelector(selectUser);

  const { messages } = useGetLastChatMessages({ user, chatId });
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleMessageSend = async () => {
    if (!(user && chatId && messageText)) return;

    return sendMessage({
      idInstance: user.idInstance,
      apiTokenInstance: user.apiTokenInstance,
      message: messageText,
      chatId,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWrapper}>
        <p className={styles.chatTitle}>Чат с {chatData?.name}</p>
        <div className={styles.chatMessages}>
          {(messages || []).map((message) => (
            <Message
              key={message.idMessage}
              text={message.textMessage}
              type={message.type}
            />
          ))}
        </div>
        <div className={styles.chatControls}>
          <TextArea
            maxLength={300}
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />
          <div className={styles.chatButtonWrapper}>
            <button
              type="button"
              className={styles.chatButton}
              onClick={handleMessageSend}
              disabled={!messageText || isLoading}
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
