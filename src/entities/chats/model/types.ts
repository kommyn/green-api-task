export interface IChat {
  chatId: string;
  name: string;
  phoneNumber: number;
  type: "user" | "group" | "supergroup" | "channel";
  username: string;
}
