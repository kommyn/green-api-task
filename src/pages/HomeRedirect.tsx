import { useContext } from "react";
import { Navigate } from "react-router";

import { AuthContext } from "@entities/auth/model";

export default function HomeRedirect() {
  const { idInstance } = useContext(AuthContext);

  return <Navigate to={idInstance ? "/main" : "/sign-in"} replace />;
}
