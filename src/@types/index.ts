// <------------------------------------------>

export interface Message {
  id: string;
  author?: string;
  content: string;
  color?: string;
  time: number;
}

// <------------------------------------------>

export interface MessagesContextProps {
  //Context Props
  sendMessage: (content: string) => void;
  receiveMessage: (message: Message) => void;
  updateAuthorName: (newName: string) => void;
  messages: Message[];
  uuid: string;
}

// <------------------------------------------>

export interface ChildrenProps {
  //Context Children Props
  children: React.ReactNode;
}

export interface UserProps {
  name: string;
  color?: string;
}
