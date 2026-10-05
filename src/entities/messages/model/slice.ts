import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IChatMessage } from "./types";
import { messagesApi } from "../api";

export interface IMessagesState {
  items: IChatMessage[];
}

const initialState: IMessagesState = {
  items: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IChatMessage[]>) => {
      state.items = action.payload
        .filter((message) => message.typeMessage === "textMessage")
        .reverse();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      messagesApi.endpoints.getLastChatMessages.matchPending,
      (state) => {
        state.items = [];
      },
    );
  },
  selectors: {
    selectMessages: (state) => state.items,
  },
});

export const { selectMessages } = messagesSlice.selectors;
export const { setMessages } = messagesSlice.actions;
