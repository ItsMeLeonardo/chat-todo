"use client";
import ConversationItem from "@/components/Conversation/ConversationItem";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/user";

type Props = {
  users: User[];
};

export default function UserList({ users }: Props) {
  const { user: loginUser } = useUser();

  return (
    <>
      {users
        .filter((user) => loginUser?.id !== user.id)
        .map((user) => (
          <ConversationItem
            key={user.id}
            avatar={user.avatar || ""}
            lastMessage="Hola, ¿cómo estás?"
            lastMessageDate={1686724588000}
            username={user.name}
          />
        ))}
    </>
  );
}
