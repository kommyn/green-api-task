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
});
