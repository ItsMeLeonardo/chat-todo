"use client";

import ConversationItem from "@/components/Conversation/ConversationItem";
import TaskItem from "@/components/Tasks/TaskItem";
import SearchIcon from "@/icons/SearchIcon";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        startContent={<SearchIcon width={20} height={20} />}
        placeholder="Busqueda rapida"
        endContent={<Kbd keys={["command", "ctrl"]}>K</Kbd>}
        size="xs"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {keyword.length > 0 && (
        <div className="absolute top-12 left-0 w-full min-h-full bg-white z-50 rounded-md shadow-3xl">
          <div className="w-full h-full flex flex-col gap-2 p-4">
            <div className="flex flex-col gap-2">
              <header className="text-xs font-bold text-neutral-500">
                Conversaciones
              </header>
              <div className="flex flex-col gap-2">
                <ConversationItem
                  avatar="https://i.pinimg.com/236x/00/6a/b7/006ab7b2133568d7e43e89bc362578a3.jpg"
                  lastMessage="Hola, como estas?"
                  lastMessageDate={new Date().getTime()}
                  username="John Doe"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <header className="text-xs font-bold text-neutral-500">
                Tareas
              </header>
              <div className="flex flex-col gap-2">
                <TaskItem
                  label="Tarea 1"
                  isCompleted={false}
                  createdAt={new Date().getTime()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
