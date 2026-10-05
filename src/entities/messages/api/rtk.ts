import { baseApi } from "@shared/api";
import type { IChatMessage } from "../model";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLastChatMessages: builder.query<
      IChatMessage[],
      { id: string; token: string; minutes?: number; chatId: string }
    >({
      query: ({ id, token, minutes, chatId }) => ({
        // url: `/waInstance${id}/lastIncomingMessages/${token}`,
        url: `/waInstance${id}/getChatHistory/${token}`,
        method: "POST",
        body: {
          chatId,
        },
        // params: { minutes },
      }),
    }),
  }),
});

export const { useGetLastChatMessagesQuery, useLazyGetLastChatMessagesQuery } =
  messagesApi;
