import { FirebaseUser, authApp } from "@/services/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

type UseUserReturn = {
  user?: User;
  logout: () => void;
};

export function getUserFromFirebaseUser(
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

  const router = useRouter();

  const logout = () => {
    authApp.signOut().then(() => {
      router.push("/");
    });
  };

  return {
    user: getUserFromFirebaseUser(firebaseUser),
    logout,
  };
}
