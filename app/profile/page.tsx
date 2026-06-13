import { auth } from "@/auth";
import LogoutButton from "../ui/logoutButton";

export default async function Dashboard() {
  const session = await auth();

  return (
<div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>
        <LogoutButton />
      <hr />

      <h2 className="text-xl font-semibold">
        Session Information
      </h2>

      <p>
        <strong>User ID:</strong>{" "}
        {session?.user?.id}
      </p>

      <p>
        <strong>Name:</strong>{" "}
        {session?.user?.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {session?.user?.email}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {session?.user?.role}
      </p>

      <hr />
    </div>
  );
}