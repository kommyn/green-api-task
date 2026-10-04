import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IUser, StateInstance } from "./types";
import { signIn } from "../api/http";

export interface IUserState {
  data: IUser | null;
  loading: boolean;
  error?: string;
}

const initialState: IUserState = {
  data: null,
  loading: false,
  error: undefined,
};

export const signInThunk = createAsyncThunk<
  { stateInstance: StateInstance },
  { idInstance: string; apiTokenInstance: string }
>("user/signIn", ({ idInstance, apiTokenInstance }) => {
  return signIn(idInstance, apiTokenInstance);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInThunk.pending, (state) => {
      state.data = null;
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.loading = false;
      switch (action.payload.stateInstance) {
        case "authorized":
          state.data = action.meta.arg;
          break;
        case "blocked":
          state.error = "Аккаунт заблокирован";
          break;
        case "notAuthorized":
          state.error = "Инстанс не авторизован";
          break;
        case "starting":
          state.error = "Инстанс в процессе запуска";
          break;
        case "suspended":
          state.error = "Аккаунт временно не доступен";
          break;
        case "pendingPassword":
          state.error = "Авторизация не завершена";
          break;
        default:
          state.error = "Инстанс не найден";
      }
    });
    builder.addCase(signInThunk.rejected, (state) => {
      state.loading = false;
      state.error = "Инстанс не найден";
    });
  },
});
