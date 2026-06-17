import { auth } from "@/auth";
import LogoutButton from "../ui/logoutButton";

export default async function AdminDashboard() {
  await connectDB();

const session = await auth();

const totalUsers = await User.countDocuments();

const totalSellers = await Seller.countDocuments();

const totalProducts = await Product.countDocuments();

const totalReviews = await Review.countDocuments();

const recentUsers = await User.find()
  .sort({ createdAt: -1 })
  .limit(5);

const recentProducts = await Product.find()
  .sort({ createdAt: -1 })
  .limit(5);

const recentReviews = await Review.find()
  .populate("user", "name")
  .populate("product", "title")
  .sort({ createdAt: -1 })
  .limit(5);

  return (
    <div className="min-h-screen bg-cream-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="font-serif text-3xl font-bold text-charcol">
              Admin Dashboard
            </h1>

            <p className="text-subheading">
              Welcome back, {session?.user?.name}
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">

          <div className="bg-white rounded-2xl p-5 border border-warm-beige">
            <p className="text-xs text-subheading">
              Users
            </p>

            <p className="text-3xl font-bold text-charcol">
              {totalUsers}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-warm-beige">
            <p className="text-xs text-subheading">
              Sellers
            </p>

            <p className="text-3xl font-bold text-charcol">
              {totalSellers}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-warm-beige">
            <p className="text-xs text-subheading">
              Products
            </p>

            <p className="text-3xl font-bold text-charcol">
              {totalProducts}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-warm-beige">
            <p className="text-xs text-subheading">
              Reviews
            </p>

            <p className="text-3xl font-bold text-charcol">
              {totalReviews}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">

          <Link
            href="/admin/users"
            className="bg-terracotta text-white px-4 py-2 rounded-xl"
          >
            Manage Users
          </Link>

          <Link
            href="/admin/products"
            className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
          >
            Manage Products
          </Link>

          <Link
            href="/admin/sellers"
            className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
          >
            Manage Sellers
          </Link>

          <Link
            href="/products"
            className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
          >
            View Marketplace
          </Link>

        </div>

        {/* Admin Info */}
        <div className="bg-white rounded-2xl border border-warm-beige p-6">

          <h2 className="text-xl font-bold mb-4">
            Administrator Information
          </h2>

          <div className="space-y-2">
            <p><strong>Name:</strong> {session?.user?.name}</p>
            <p><strong>Email:</strong> {session?.user?.email}</p>
            <p><strong>Role:</strong> {session?.user?.role}</p>
          </div>

        </div>

        <div className="bg-white rounded-2xl border border-warm-beige p-6 mb-8">

          <h2 className="text-xl font-bold mb-4">
            Recent Users
          </h2>

          <div className="space-y-3">

            {recentUsers.map((user) => (
              <div
                key={user._id.toString()}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {user.name}
                  </p>

                  <p className="text-sm text-subheading">
                    {user.email}
                  </p>
                </div>

                <span className="text-sm capitalize">
                  {user.role}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-warm-beige p-6 mb-8">

          <h2 className="text-xl font-bold mb-4">
            Recent Products
          </h2>

          <div className="space-y-3">

            {recentProducts.map((product) => (
              <div
                key={product._id.toString()}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {product.title}
                  </p>

                  <p className="text-sm text-subheading">
                    {product.category}
                  </p>
                </div>

                <span className="font-semibold text-terracotta">
                  ${product.price}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="bg-white rounded-2xl border border-warm-beige p-6">

          <h2 className="text-xl font-bold mb-4">
            Recent Reviews
          </h2>

          <div className="space-y-3">

            {recentReviews.map((review) => (
              <div
                key={review._id.toString()}
                className="border-b pb-2"
              >
                <p className="font-medium">
                  {review.user?.name}
                </p>

                <p className="text-sm text-subheading">
                  {review.product?.title}
                </p>

                <p className="text-sm">
                  ⭐ {review.rating}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}