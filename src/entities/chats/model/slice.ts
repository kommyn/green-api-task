import { createSlice } from "@reduxjs/toolkit";

import type { IChat } from "./types";
import { chatsApi } from "../api";

export interface IChatsState {
  items: IChat[];
}

const initialState: IChatsState = {
  items: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      chatsApi.endpoints.getChats.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
      },
    );
  },
  selectors: {
    selectChats: (state) => state.items,
    selectChatById: (state, chatId?: string) =>
      state.items.find((chat) => chat.chatId === chatId),
  },
});

export const { selectChats, selectChatById } = chatsSlice.selectors;
