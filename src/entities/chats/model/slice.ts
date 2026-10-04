import { createSlice } from "@reduxjs/toolkit";

import type { IChat } from "./types";

export interface IChatsState {
  chats: IChat[];
}

const initialState: IChatsState = {
  chats: [],
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
});
