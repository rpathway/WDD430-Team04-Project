import { auth } from "@/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcol">
            My Dashboard
          </h1>

          <p className="text-subheading">
            Welcome back, {session?.user?.name}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">

        <div className="bg-white rounded-2xl p-5 border border-warm-beige">
          <p className="text-xs text-subheading">
            Orders
          </p>

          <p className="text-3xl font-bold text-charcol">
            0
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-warm-beige">
          <p className="text-xs text-subheading">
            Wishlist
          </p>

          <p className="text-3xl font-bold text-charcol">
            0
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-warm-beige">
          <p className="text-xs text-subheading">
            Reviews
          </p>

          <p className="text-3xl font-bold text-charcol">
            0
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">

        <Link
          href="/products"
          className="bg-terracotta text-white px-4 py-2 rounded-xl"
        >
          Browse Products
        </Link>

        <Link
          href="/carts"
          className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
        >
          My Cart
        </Link>

        <Link
          href="/profile/edit"
          className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
        >
          Edit Profile
        </Link>

      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-warm-beige p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Account Information
        </h2>

        <div className="space-y-2">
          <p><strong>Name:</strong> {session?.user?.name}</p>
          <p><strong>Email:</strong> {session?.user?.email}</p>
          <p><strong>Role:</strong> {session?.user?.role}</p>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-warm-beige p-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Orders
        </h2>

        <p className="text-subheading">
          No orders yet.
        </p>

      </div>

    </div>
  );
}