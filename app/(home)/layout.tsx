import { ReactNode } from "react";

import PageOptionButtons from "./components/PageOptionButtons";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <section className="max-w-md mx-auto h-full w-full p-2 grid place-items-center">
      <div className="flex flex-col w-full items-center gap-4 bg-white p-4 rounded-2xl h-[90%] overflow-hidden">
        <Navbar />
        <SearchBar />
        <PageOptionButtons />
        <div className="w-full h-full bg-neutral-50 p-2 rounded-xl overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}
