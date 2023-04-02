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
  author: UserProps;
  login: (newName: string) => void;
  logout: () => void;
  messages: Message[];
}

// <------------------------------------------>

export interface ChildrenProps {
  //Context Children Props
  children: React.ReactNode;
}

export interface UserProps {
  id: string;
  name: string;
  color?: string;
}
