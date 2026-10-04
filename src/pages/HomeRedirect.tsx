import { Navigate } from "react-router";

import { useAppSelector } from "@shared/lib";

export default function HomeRedirect() {
  const user = useAppSelector((state) => state.user);

  return <Navigate to={user ? "/main" : "/sign-in"} replace />;
}
