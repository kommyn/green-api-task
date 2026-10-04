import { http } from "@shared/api";

import type { StateInstance } from "../model/types";

export async function signIn(idInstance: string, apiTokenInstance: string) {
  const result = await http<{ stateInstance: StateInstance }>(
    `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
  );

  return result;
}
