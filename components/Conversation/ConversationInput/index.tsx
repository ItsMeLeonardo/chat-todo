"use client";

import { useUser } from "@/hooks/useUser";
import SendIcon from "@/icons/SendIcon";
import { addMessage } from "@/services/db/conversations";
import { MessageConversation } from "@/types/conversation";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useRef, useState } from "react";

type Props = {
  conversationId: string;
  onSend: (message: MessageConversation) => void;
};

export default function ConversationInput({ conversationId, onSend }: Props) {
  const [textValue, setTextValue] = useState("");

  const { user } = useUser();

  const handleSubmit = () => {
    const message = textValue.trim();

    if (!message || !user) return;

    const conversationMessage: MessageConversation = {
      content: message,
      id: crypto.randomUUID(),
      user: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
      createdAt: Date.now(),
    };
    addMessage(conversationId, conversationMessage).then(() => {
      onSend(conversationMessage);
      setTextValue("");
    });
  };

  return (
    <div className="p-2 bg-white w-full flex gap-2 items-center rounded-xl">
      <Textarea
        placeholder="Escribe un mensaje..."
        maxRows={3}
        minRows={1}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        classNames={{
          label: "hidden",
          input: "p-0",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey === true) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Button
        isIconOnly
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white text-2xl shadow-2xl shadow-orange-400/50 self-end"
      >
        <SendIcon />
      </Button>
    </div>
  );
}
