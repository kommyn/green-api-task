import { Navigate } from "react-router";

import { useAppSelector } from "@shared/lib";
import { selectUser } from "@entities/user/model";

export default function HomeRedirect() {
  const user = useAppSelector(selectUser);

  return <Navigate to={user ? "/main" : "/sign-in"} replace />;
}
