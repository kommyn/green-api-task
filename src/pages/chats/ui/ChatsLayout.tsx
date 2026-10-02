import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthContext } from "@entities/auth/model";

export default function ChatsLayout() {
  const authContext = useContext(AuthContext);

  if (!authContext.idInstance) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
