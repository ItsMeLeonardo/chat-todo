import { getUsers } from "@/services/db/user";
import UserList from "./components/UserList";

export default async function MessagePage() {
  const users = await getUsers();

  return (
    <div className="w-full flex flex-col gap-2 h-full p-2">
      <UserList users={users} />
    </div>
  );
}
