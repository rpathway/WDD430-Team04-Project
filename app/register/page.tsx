"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Registration failed"
        );
        return;
      }

      const loginResult =
        await signIn(
          "credentials",
          {
            email: formData.email,
            password:
              formData.password,
            redirect: false,
          }
        );

      if (loginResult?.error) {
        setError(
          "Account created but login failed"
        );
        return;
      }

      if (
        formData.role === "seller"
      ) {
        router.push(
          "/sellers/complete-profile"
        );
      } else {
        router.push("/");
      }
    } catch (error) {
      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-amber-700">
          Create Account
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Join Handcrafted Haven
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Register As
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            >
              <option value="buyer">
                Buyer
              </option>

              <option value="seller">
                Seller
              </option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-700 py-3 font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}