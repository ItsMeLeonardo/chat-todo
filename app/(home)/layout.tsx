import { ReactNode } from "react";

import { Input } from "@nextui-org/input";
import SearchIcon from "@/icons/SearchIcon";
import PageOptionButtons from "./components/PageOptionButtons";
import Navbar from "./components/Navbar";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <section className="max-w-md mx-auto h-full w-full p-2 grid place-items-center">
      <div className="flex flex-col w-full items-center gap-4 bg-white p-4 rounded-2xl h-[90%] overflow-hidden">
        <Navbar />
        <Input
          startContent={<SearchIcon width={20} height={20} />}
          placeholder="Buscar conversación"
          size="xs"
        />
        <PageOptionButtons />
        <div className="w-full h-full bg-neutral-50 p-2 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}
