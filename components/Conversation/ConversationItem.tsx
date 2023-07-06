import { timeAgo } from "@/utils/date";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export type ConversationItemProps = {
  avatar: string;
  username: string;
  lastMessage: string;
  lastMessageDate: number;
};

export default function ConversationItem(props: ConversationItemProps) {
  const { avatar, lastMessage, lastMessageDate, username } = props;

  return (
    <Link
      href={`/conversation/${username}`}
      className="flex w-full items-center gap-2 p-2 md:p-4 rounded-2xl bg-white cursor-pointer hover:bg-content2"
    >
      <Avatar src={avatar} />
      <div className="flex flex-col flex-grow">
        <span className="text-xs font-bold text-orange-400">{username}</span>
        <span className="text-xs text-neutral-400">{lastMessage}</span>
      </div>
      <div className="self-start">
        <time className="text-xs text-neutral-300">
          {timeAgo(lastMessageDate)}
        </time>
      </div>
    </Link>
  );
}
