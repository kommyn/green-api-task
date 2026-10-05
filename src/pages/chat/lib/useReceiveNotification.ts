import { skipToken } from "@reduxjs/toolkit/query";

import type { IUser } from "@entities/user/model";
import { useReceiveNotificationQuery } from "@entities/messages/api";

export interface UseReceiveNotificationArgs {
  user: IUser | null;
}

export const useReceiveNotification = ({
  user,
}: UseReceiveNotificationArgs) => {
  return useReceiveNotificationQuery(
    user
      ? {
          idInstance: user.idInstance,
          apiTokenInstance: user.apiTokenInstance,
        }
      : skipToken,
    {
      pollingInterval: 50,
    },
  );
};
