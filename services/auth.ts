import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { User } from "firebase/auth";

import { app } from "@/services/api";
import { getUserFromFirebaseUser } from "@/hooks/useUser";

import { addUser } from "@/services/db/user";

export type FirebaseUser = User;

export const authApp = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () =>
  signInWithPopup(authApp, googleProvider).then((result) => {
    const user = getUserFromFirebaseUser(result.user);
    if (user) {
      addUser(user);
    }
  });

export const auth = {
  signInWithGoogle,
};
