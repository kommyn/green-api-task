import { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthContext } from "@entities/auth/model";

export default function AuthLayout() {
  const authContext = useContext(AuthContext);

  if (authContext.idInstance) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
}
