import {
  getFirestore,
  collection,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";

import { app } from "@/services/api";
import { Conversation, MessageConversation } from "@/types/conversation";

export const db = getFirestore(app);

export async function addConversation(conversation: Conversation) {
  try {
    const conversationRef = collection(db, "conversations");

    await setDoc(doc(conversationRef, conversation.id), conversation);

    return conversation.id;
  } catch (error) {
    console.error(`error in addConversation: ${error}`);
  }
}

export async function addMessage(
  conversationId: string,
  message: Omit<MessageConversation, "createdAt">
) {
  try {
    const conversationRef = doc(db, "conversations", conversationId);

    await updateDoc(conversationRef, {
      messages: arrayUnion({
        ...message,
        createdAt: Date.now(),
      }),
    });
  } catch (error) {
    console.error(`error in addMessage: ${error}`);
  }
}

export async function getConversation(id: string): Promise<Conversation> {
  try {
    const conversationRef = doc(db, "conversations", id);

    const conversationSnapshot = await getDoc(conversationRef);

    const conversation = conversationSnapshot.data();

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    return conversation as Conversation;
  } catch (error) {
    console.error(`error in getConversation: ${error}`);
    return {
      id,
      messages: [],
    };
  }
}

export const getConversationQuery = (id: string) => {
  const conversationRef = collection(db, "conversations");

  const conversationQuery = query(conversationRef, where("id", "==", id));

  return conversationQuery;
};
