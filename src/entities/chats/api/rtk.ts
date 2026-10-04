import type { IChat } from "../model";
import { baseApi } from "@shared/api";

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<IChat[], { id: string; token: string }>({
      query: ({ id, token }) => `/waInstance${id}/getChats/${token}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetChatsQuery, useLazyGetChatsQuery } = chatsApi;
