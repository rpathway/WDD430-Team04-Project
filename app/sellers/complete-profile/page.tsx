"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteSellerProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bio: "",
    specialty: "",
    location: "",
    instagram: "",
    facebook: "",
    website: "",
  });

  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
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
        "/api/sellers/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            bio: formData.bio,
            specialty: formData.specialty,
            location: formData.location,
      
            socialLinks: {
              instagram:
                formData.instagram,
              facebook:
                formData.facebook,
              website:
                formData.website,
            },
          }),
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update profile"
        );
      }

      router.push(
        "/sellers/dashboard"
      );
    } catch (error: any) {
      setError(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-amber-700">
          Complete Seller Profile
        </h1>

        <p className="mb-8 text-gray-600">
          Tell buyers more about your
          craft and business.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block font-medium">
              Bio
            </label>

            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Specialty
            </label>

            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Woodwork, Pottery, Jewelry..."
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Lagos, Nigeria"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Instagram
            </label>

            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@yourbusiness"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Facebook
            </label>

            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook Page"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Website
            </label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-gray-900 focus:border-amber-700 focus:ring-2 focus:ring-amber-200 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-700 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Complete Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}