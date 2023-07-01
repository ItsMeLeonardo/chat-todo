import { FirebaseUser, authApp } from "@/services/auth";
import { User } from "@/types/user";
import { useAuthState } from "react-firebase-hooks/auth";

type UseUserReturn = {
  user?: User;
};

function getUserFromFirebaseUser(
  firebaseUser?: FirebaseUser | null
): User | undefined {
  if (!firebaseUser) return undefined;

  return {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || "Sin nombre",
    email: firebaseUser.email || "Sin email",
    avatar: firebaseUser.photoURL || undefined,
  };
}

export function useUser(): UseUserReturn {
  const [firebaseUser] = useAuthState(authApp);

  return {
    user: getUserFromFirebaseUser(firebaseUser),
  };
}
