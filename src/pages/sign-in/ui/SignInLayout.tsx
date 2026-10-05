import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "@shared/lib";
import { selectUser } from "@entities/user/model";

export default function AuthLayout() {
  const user = useAppSelector(selectUser);

  if (user) {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
}
