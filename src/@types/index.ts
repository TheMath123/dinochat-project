// <------------------------------------------>

export interface Message {
  id: string;
  author: string | null;
  content: string;
  time: number;
}

// <------------------------------------------>

export interface IMessagesContextProps {
  //Context Props
  sendMessage: (content: string) => void;
  receiveMessage: (message: Message) => void;
  updateAuthorName: (newName: string) => void;
  messages: Message[];
  uuid: string;
}

// <------------------------------------------>

export interface IChildrenProps {
  //Context Children Props
  children: React.ReactNode;
}
