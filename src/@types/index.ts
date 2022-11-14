// <------------------------------------------>

export interface Message {
  author: string | null;
  content: string;
  time: Date;
}

// <------------------------------------------>

export interface IMessagesContextProps {
  //Context Props
  sendMessage: (content: string) => void;
  receiveMessage: (message: Message) => void;
  messages: Message[];
}

// <------------------------------------------>

export interface IChildrenProps {
  //Context Children Props
  children: React.ReactNode;
}
