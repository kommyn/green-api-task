import { skipToken } from "@reduxjs/toolkit/query";

import { useGetLastChatMessagesQuery } from "@entities/messages/api";
import type { IUser } from "@entities/user/model";

export interface UseGetLastChatMessagesArgs {
  user: IUser | null;
  chatId?: string;
}

export const useGetLastChatMessages = ({
  user,
  chatId,
}: UseGetLastChatMessagesArgs) => {
  return useGetLastChatMessagesQuery(
    user && chatId
      ? {
          idInstance: user.idInstance,
          apiTokenInstance: user.apiTokenInstance,
          chatId: chatId,
        }
      : skipToken,
    {
      selectFromResult: ({ data, ...rest }) => ({
        messages:
          data &&
          data
            .filter((message) => message.typeMessage === "textMessage")
            .reverse(),
        ...rest,
      }),
    },
  );
};
