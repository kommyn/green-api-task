export interface IUser {
  idInstance: string;
  apiTokenInstance: string;
}

export type StateInstance =
  | "notAuthorized"
  | "authorized"
  | "blocked"
  | "starting"
  | "suspended"
  | "pendingPassword";
