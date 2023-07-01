import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { User } from "firebase/auth";

import { app } from "@/services/api";

export type FirebaseUser = User;

export const authApp = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(authApp, googleProvider);

export const auth = {
  signInWithGoogle,
};
