import { baseApi } from "@shared/api";
import type { IChatMessage } from "../model";

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
    }),
    sendMessage: builder.mutation<
      { messageId: string },
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
    }),
  }),
});

export const {
  useGetLastChatMessagesQuery,
  useLazyGetLastChatMessagesQuery,
  useSendMessageMutation,
} = messagesApi;
