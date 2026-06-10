"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      setError("Invalid email or password");
      return;
    }

    // Fetch the updated session to get the user's role dynamically
    const session = await getSession();
    const role = session?.user?.role;

    setLoading(false);

    // Dynamic redirection based on role
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "seller") {
      router.push("/sellers");
    } else if (role === "buyer") {
      router.push("/profile"); // Or wherever you want buyers to land
    } else {
      router.push("/"); // Fallback to home if no role matches
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-amber-700">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Sign in to your Handcrafted Haven account
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-700 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}