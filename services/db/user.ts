import { User } from "@/types/user";
import { collection, setDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "./db";

export async function addUser(User: User) {
  try {
    const userCollection = collection(db, "users");
    const userRef = doc(userCollection, User.id);

    await setDoc(userRef, User, {
      merge: true,
    });
    return userRef.id;
  } catch (error) {
    console.error(`${error} in addUser`);
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const userCollection = collection(db, "users");
    const userSnapshot = await getDocs(userCollection);

    return userSnapshot.docs.map((doc) => {
      const data = doc.data();

      const user: User = {
        id: doc.id,
        name: data.name,
        email: data.email,
      };

      if (data.avatar) {
        user.avatar = data.avatar;
      }
      return user;
    });
  } catch (error) {
    console.error(`${error} in getUsers`);
    return [];
  }
}
