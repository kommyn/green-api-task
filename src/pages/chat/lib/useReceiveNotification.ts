import { skipToken } from "@reduxjs/toolkit/query";

import type { IUser } from "@entities/user/model";
import { useReceiveNotificationQuery } from "@entities/messages/api";

export interface UseReceiveNotificationArgs {
  user: IUser | null;
  usePhone?: boolean;
}

export const useReceiveNotification = ({
  user,
  usePhone = false,
}: UseReceiveNotificationArgs) => {
  return useReceiveNotificationQuery(
    user
      ? {
          idInstance: user.idInstance,
          apiTokenInstance: user.apiTokenInstance,
          usePhone,
        }
      : skipToken,
    {
      pollingInterval: 50,
    },
  );
};
