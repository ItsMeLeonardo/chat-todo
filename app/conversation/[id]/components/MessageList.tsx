"use client";
import ConversationInput from "@/components/Conversation/ConversationInput";
import Message from "@/components/Conversation/Message";
import { useUser } from "@/hooks/useUser";
import { Conversation } from "@/types/conversation";
import React, { useState } from "react";

type Props = {
  conversation: Conversation;
};

export default function MessageList({ conversation }: Props) {
  const { user } = useUser();

  const [messages, setMessages] = useState(conversation.messages);

  return (
    <>
      <div className="flex flex-col gap-2 flex-grow overflow-auto">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            createdAt={message.createdAt}
            avatar={message.user.avatar}
            self={message.user.id === user?.id}
          />
        ))}
      </div>

      <div className="">
        <ConversationInput
          onSend={(message) => {
            setMessages([...messages, message]);
          }}
          conversationId={conversation.id}
        />
      </div>
    </>
  );
}
