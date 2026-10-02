import { useState, useCallback, useEffect } from "react";

import { type IAuthContextData, AuthContext } from "./AuthContext";
import type { NotNull } from "../../../shared/lib/utility-types";

const AUTH_DATA_KEY = "AUTH_DATA_KEY";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authContextData, setAuthContextData] = useState<IAuthContextData>(
    () => {
      const authDataStr = window.localStorage.getItem(AUTH_DATA_KEY);

      const authData = authDataStr
        ? (JSON.parse(authDataStr) as NotNull<IAuthContextData>)
        : null;

      return {
        idInstance: authData?.idInstance || null,
        apiTokenInstance: authData?.apiTokenInstance || null,
      };
    },
  );
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const authDataStr = window.localStorage.getItem(AUTH_DATA_KEY);

    return !!authDataStr;
  });

  const signIn = useCallback(
    (value: NotNull<IAuthContextData>) => {
      window.localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(value));

      setAuthContextData(value);
      setAuthenticated(true);
    },
    [setAuthContextData],
  );

  const signOut = useCallback(() => {
    window.localStorage.removeItem(AUTH_DATA_KEY);

    setAuthContextData({ idInstance: null, apiTokenInstance: null });
    setAuthenticated(false);
  }, [setAuthContextData]);

  useEffect(() => {
    const authDataStr = window.localStorage.getItem(AUTH_DATA_KEY);

    const authData = authDataStr
      ? (JSON.parse(authDataStr) as NotNull<IAuthContextData>)
      : null;

    if (authData) {
      setAuthContextData(authData);
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext
      value={{ ...authContextData, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext>
  );
}
