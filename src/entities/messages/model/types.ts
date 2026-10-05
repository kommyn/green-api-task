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

export interface IIncomingTextMessage {
  typeWebhook: "incomingMessageReceived";
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    chatName: string;
    chatType: string;
    sender: string;
    senderName: string;
    senderType: string;
    senderContactName: string;
    senderPhoneNumber: number;
  };
  messageData: {
    typeMessage: "textMessage";
    textMessageData: {
      textMessage: string;
      forwardingScore?: number;
      isForwarded?: boolean;
    };
  };
}
