import { createContext } from "react";

import type { NotNull } from "../../../shared/lib/utility-types";

export interface IAuthContextData {
  idInstance: string | null;
  apiTokenInstance: string | null;
}

export interface IAuthContext extends IAuthContextData {
  isAuthenticated: boolean;
  signIn: (value: NotNull<IAuthContextData>) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  idInstance: null,
  apiTokenInstance: null,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});
