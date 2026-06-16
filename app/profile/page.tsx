import { auth } from "@/auth";
import LogoutButton from "../ui/logoutButton";


export default async function Dashboard() {
  const session = await auth();

  return (
    <main className="mb-30 bg-stone-50 px-4 py-5">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
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
      </div>
    </main>
  );
}