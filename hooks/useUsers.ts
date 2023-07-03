import { getUsers } from "@/services/db/user";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useUsers(): {
  users: User[];
  loading: boolean;
} {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  return {
    users: users.filter((u) => u.id !== user?.id),
    loading,
  };
}
