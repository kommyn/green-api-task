import { useEffect, useRef, useState, type FC } from "react";
import { useParams } from "react-router";

import PlayIcon from "@assets/icons/play-solid-full.svg";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import TextArea from "@shared/ui/TextArea";
import { useSendMessageMutation } from "@entities/messages/api";
import { selectChatById } from "@entities/chats/model";
import { selectUser } from "@entities/user/model";
import { selectMessages, setMessages } from "@entities/messages/model";

import styles from "./ChatPage.module.css";
import { useGetLastChatMessages, useReceiveNotification } from "../lib";
import Message from "./Message";

const ChatPage: FC = () => {
  const { chatId } = useParams();

  const [messageText, setMessageText] = useState("");

  const chatData = useAppSelector((state) => selectChatById(state, chatId));
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectMessages);

  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const dispatch = useAppDispatch();

  const { data: historyMessages } = useGetLastChatMessages({ user, chatId });
  useReceiveNotification({ user, usePhone: !!chatId?.match(/.*@c\.us/g) });
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleMessageSend = async () => {
    if (!(user && chatId && messageText)) return;

    const response = await sendMessage({
      idInstance: user.idInstance,
      apiTokenInstance: user.apiTokenInstance,
      message: messageText,
      chatId,
    });
    if (response.data) {
      setMessageText("");
    }
  };

  useEffect(() => {
    if (historyMessages) dispatch(setMessages(historyMessages));
  }, [historyMessages, dispatch]);

  useEffect(() => {
    chatMessagesRef.current?.scrollTo(0, chatMessagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.chatWrapper}>
        <p className={styles.chatTitle}>Чат с {chatData?.name || chatId}</p>
        <div className={styles.chatMessages} ref={chatMessagesRef}>
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (!event.shiftKey) {
                  event.preventDefault();
                  buttonRef.current?.click();
                }
              }
            }}
          />
          <div className={styles.chatButtonWrapper}>
            <button
              type="button"
              className={styles.chatButton}
              onClick={handleMessageSend}
              disabled={!messageText || isLoading}
              ref={buttonRef}
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
