import { auth } from "@/auth";
import LogoutButton from "../ui/logoutButton";

export default async function adminDashboard() {
  const session = await auth();

  return (
    <div>
      Welcome {session?.user?.name}
      <p>Role: {session?.user?.role}</p>
      <LogoutButton />
    </div>
  );
}