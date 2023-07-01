import { timeAgo } from "@/utils/date";
import { Avatar } from "@nextui-org/avatar";
import clsx from "clsx";

export type MessageProps = {
  content: string;
  self?: boolean;
  createdAt: number;
  avatar?: string;
};

export default function Message(props: MessageProps) {
  const { content, createdAt, self, avatar } = props;

  const rootClasses = clsx("flex w-full gap-2");

  const messageClasses = clsx(
    "bg-neutral-100 rounded-xl p-3 w-auto max-w-[90%] flex flex-col gap-2 self-start",
    {
      "!bg-white": self,
      "self-end": self,
      "ml-auto": self,
    }
  );

  const timeClasses = clsx("text-xs text-neutral-400 self-start", {
    "self-end": !self,
  });

  return (
    <div className={rootClasses}>
      {!self && <Avatar src={avatar} />}
      <div className={messageClasses}>
        <p className="text-sm text-neutral-500">{content}</p>
        <span className={timeClasses}>{timeAgo(createdAt)}</span>
      </div>
    </div>
  );
}
