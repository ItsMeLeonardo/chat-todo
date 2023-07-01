import ConversationInput from "@/components/Conversation/ConversationInput";
import Message from "@/components/Conversation/Message";
import PinnedMessage from "@/components/Conversation/PinnedMessage";

type Props = {
  params: {
    id: string;
  };
};
export default function ConversationPage({ params }: Props) {
  return (
    <div className="flex flex-col gap-2 h-full relative">
      <div className="absolute w-full top-0 left-0">
        <PinnedMessage message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, nobis. Velit praesentium accusantium doloremque recusandae debitis reiciendis sunt, reprehenderit esse nulla maxime quo, doloribus laborum, ipsam aspernatur voluptas iure rerum?" />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <Message
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, nobis. Velit praesentium accusantium doloremque recusandae debitis reiciendis sunt, reprehenderit esse nulla maxime quo, doloribus laborum, ipsam aspernatur voluptas iure rerum?"
          createdAt={1686724588000}
          self
        />
        <Message
          avatar="https://images.unsplash.com/photo-1688019984360-50d40dfa955a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
          content="Hola, ¿cómo estás?"
          createdAt={1686724588000}
        />
      </div>
      <div className="">
        <ConversationInput />
      </div>
    </div>
  );
}
