import SendIcon from "@/icons/SendIcon";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

export default function ConversationInput() {
  return (
    <div className="p-2 bg-white w-full flex gap-2 items-center rounded-xl">
      <Textarea
        placeholder="Escribe un mensaje..."
        maxRows={3}
        minRows={1}
        classNames={{
          label: "hidden",
          input: "p-0",
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
