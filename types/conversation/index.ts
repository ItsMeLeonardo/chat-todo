export type Conversation = {
  id: string;
  messages: MessageConversation[];
};

export type MessageConversation = {
  content: string;
  createdAt: number;
  user: UserMessage;
  id: string;
};

export type UserMessage = {
  id: string;
  name: string;
  avatar?: string;
};
