import { Navigate, Outlet } from "react-router";

import { useAppSelector } from "@shared/lib";

export default function AuthLayout() {
  const user = useAppSelector((state) => state.user.data);

  if (user) {
    return <Navigate to="/chats" replace />;
  }

  return <Outlet />;
}
