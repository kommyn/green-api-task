export interface IChatMessage {
  type: "incoming" | "outgoing";
  idMessage: string;
  timestamp: number;
  typeMessage:
    | "textMessage"
    | "imageMessage"
    | "videoMessage"
    | "documentMessage"
    | "audioMessage"
    | "pollMessage"
    | "locationMessage";
  isForwarded: boolean;
  textMessage: string;
}
