"use client";
import { ReactNode } from "react";

type ConversationLayoutProps = {
  children: ReactNode;
};

export default function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  return children;
}
