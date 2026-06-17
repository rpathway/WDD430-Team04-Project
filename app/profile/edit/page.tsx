"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session?.user?.id) return;
    async function loadUser() {
      try {
        const res = await fetch(`/api/profiles/${session?.user?.id}`);
        const data = await res.json();
        setName(data.name || "");
        setEmail(data.email || "");
        setProfileImage(data.profileImage || "");
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [session?.user?.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/profiles/${session?.user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, profileImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      await update({ name: data.name, email: data.email, profileImage: data.profileImage });
      router.push("/profile");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="max-w-xl mx-auto px-4 py-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="font-serif text-2xl font-bold text-charcol mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-warm-beige p-6 space-y-4">
        {error && <p className="text-sm text-red-500">{error}</p>}

        <div>
          <label className="text-xs font-semibold text-subheading-dark block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-warm-beige rounded-xl px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-subheading-dark block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-warm-beige rounded-xl px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-subheading-dark block mb-1">Profile Image URL</label>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="https://imgur.com/photo.jpg"
            className="w-full border border-warm-beige rounded-xl px-3 py-2 text-sm outline-none focus:border-terracotta"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-terracotta text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-terra-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link href="/profile" className="text-sm font-semibold text-subheading-dark border border-warm-beige px-4 py-2 rounded-xl hover:bg-cream-white transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}