import { baseApi } from "@shared/api";
import { type IChatMessage, type IIncomingTextMessage } from "../model";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLastChatMessages: builder.query<
      IChatMessage[],
      { idInstance: string; apiTokenInstance: string; chatId: string }
    >({
      query: ({ idInstance, apiTokenInstance, chatId }) => ({
        url: `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
        method: "POST",
        body: {
          chatId,
        },
      }),
      providesTags: (_, __, arg) => [{ type: "Messages", id: arg.chatId }],
    }),

    sendMessage: builder.mutation<
      { idMessage: string },
      {
        idInstance: string;
        apiTokenInstance: string;
        chatId: string;
        message: string;
      }
    >({
      query: ({ idInstance, apiTokenInstance, chatId, message }) => ({
        url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: "POST",
        body: { chatId, message },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (!data) return;

        const newMessage: IChatMessage = {
          idMessage: data.idMessage,
          type: "outgoing",
          timestamp: Date.now(),
          typeMessage: "textMessage",
          isForwarded: false,
          textMessage: arg.message,
        };

        dispatch(
          messagesApi.util.updateQueryData(
            "getLastChatMessages",
            {
              idInstance: arg.idInstance,
              apiTokenInstance: arg.apiTokenInstance,
              chatId: arg.chatId,
            },
            (draft) => {
              const exists = draft.some(
                (message) => message.idMessage === data.idMessage,
              );
              if (!exists) draft.unshift(newMessage);
            },
          ),
        );
      },
    }),

    receiveNotification: builder.query<
      {
        receiptId: number;
        body: IIncomingTextMessage;
      },
      {
        idInstance: string;
        apiTokenInstance: string;
        receiveTimeout?: number;
      }
    >({
      query: ({ idInstance, apiTokenInstance, receiveTimeout }) => ({
        url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
        params: {
          receiveTimeout,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data) {
            if (data.body.messageData.typeMessage === "textMessage") {
              const newMessage: IChatMessage = {
                idMessage: data.body.idMessage,
                type: "incoming",
                timestamp: data.body.timestamp,
                typeMessage: "textMessage",
                isForwarded:
                  data.body.messageData.textMessageData.isForwarded || false,
                textMessage: data.body.messageData.textMessageData.textMessage,
              };

              dispatch(
                messagesApi.util.updateQueryData(
                  "getLastChatMessages",
                  {
                    idInstance: arg.idInstance,
                    apiTokenInstance: arg.apiTokenInstance,
                    chatId: data.body.senderData.chatId,
                  },
                  (draft) => {
                    const exists = draft.some(
                      (message) => message.idMessage === data.body.idMessage,
                    );
                    if (!exists) draft.unshift(newMessage);
                  },
                ),
              );
            }

            await dispatch(
              messagesApi.endpoints.deleteNotification.initiate({
                idInstance: arg.idInstance,
                apiTokenInstance: arg.apiTokenInstance,
                receiptId: data.receiptId,
              }),
            );
          }
        } catch (error) {
          console.error("Ошибка при удалении уведомления:", error);
        }
      },
    }),

    deleteNotification: builder.mutation<
      {
        result: boolean;
        reason?: string;
      },
      {
        idInstance: string;
        apiTokenInstance: string;
        receiptId: number;
      }
    >({
      query: ({ idInstance, apiTokenInstance, receiptId }) => ({
        url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetLastChatMessagesQuery,
  useLazyGetLastChatMessagesQuery,
  useReceiveNotificationQuery,
  useLazyReceiveNotificationQuery,
  useSendMessageMutation,
} = messagesApi;
