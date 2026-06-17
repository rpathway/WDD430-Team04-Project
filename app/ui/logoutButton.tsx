// components/LogoutButton.tsx

"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg bg-red-500 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-red-400 hover:border-red-300"
    >
      Logout
    </button>
  );
}