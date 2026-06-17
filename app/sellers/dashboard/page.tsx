import Link from "next/link";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Header from "@/app/ui/header";

import Seller from "@/models/sellerModel";
import Product from "@/models/productModel";
import Review from "@/models/reviewModel";

// import LogoutButton from "@/app/ui/logoutButton";

export default async function SellerDashboard() {
  await connectDB();

  const session = await auth();

  const seller = await Seller.findOne({
    user: session?.user?.id,
  }).populate("user");

  const products = await Product.find({
    seller: session?.user?.id,
  }).sort({
    createdAt: -1,
  });

  const productIds = products.map(
    (product) => product._id
  );

  const reviews = await Review.find({
    product: {
      $in: productIds,
    },
  })
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  const totalProducts =
    products.length;

  const totalReviews =
    reviews.length;

  const averageRating =
    totalProducts > 0
      ? (
          products.reduce(
            (acc, product) =>
              acc +
              (product.averageRating || 0),
            0
          ) / totalProducts
        ).toFixed(1)
      : "0";

      return (
        <div className="min-h-screen bg-cream-white">
          <Header />
      
          <div className="max-w-7xl mx-auto px-4 py-6">
      
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-serif text-3xl font-bold text-charcol">
                  Seller Dashboard
                </h1>
      
                <p className="text-subheading">
                  Welcome back, {session?.user?.name}
                </p>
              </div>
      
              {/* <LogoutButton /> */}
            </div>
      
            {/* Stats */}
      
            <div className="grid gap-4 md:grid-cols-3 mb-8">
      
              <div className="bg-white rounded-2xl p-5 border border-warm-beige">
                <p className="text-xs text-subheading">
                  Products
                </p>
      
                <p className="text-3xl font-bold text-charcol">
                  {products.length}
                </p>
              </div>
      
              <div className="bg-white rounded-2xl p-5 border border-warm-beige">
                <p className="text-xs text-subheading">
                  Reviews
                </p>
      
                <p className="text-3xl font-bold text-charcol">
                  {seller?.totalReviews || 0}
                </p>
              </div>
      
              <div className="bg-white rounded-2xl p-5 border border-warm-beige">
                <p className="text-xs text-subheading">
                  Rating
                </p>
      
                <p className="text-3xl font-bold text-charcol">
                  {seller?.ratingsAverage || 0}
                </p>
              </div>
      
            </div>
      
            {/* Actions */}
      
            <div className="flex flex-wrap gap-3 mb-8">
      
              <Link
                href="/sellers/products/new"
                className="bg-terracotta text-white px-4 py-2 rounded-xl"
              >
                Add Product
              </Link>
      
              <Link
                href="/products"
                className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
              >
                Manage Products
              </Link>
      
              <Link
                href="/sellers/complete-profile"
                className="border border-warm-beige bg-white px-4 py-2 rounded-xl"
              >
                Edit Profile
              </Link>
      
            </div>
      
            {/* Seller Profile */}
      
            <div className="bg-white rounded-2xl border border-warm-beige p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">
                Seller Profile
              </h2>
      
              <div className="space-y-2">
                <p>
                  <strong>Specialty:</strong>{" "}
                  {seller?.specialty || "Not set"}
                </p>
      
                <p>
                  <strong>Location:</strong>{" "}
                  {seller?.location || "Not set"}
                </p>
      
                <p>
                  <strong>Bio:</strong>{" "}
                  {seller?.bio || "No bio yet"}
                </p>
              </div>
            </div>
      
            {/* Recent Products */}
      
            <div className="bg-white rounded-2xl border border-warm-beige p-6">
      
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  My Products
                </h2>
      
                <Link
                  href="/products"
                  className="text-terracotta"
                >
                  View All
                </Link>
              </div>
      
              {products.length === 0 ? (
                <p className="text-subheading">
                  No products yet.
                </p>
              ) : (
                <div className="space-y-4">
      
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <Link href={`/products/${product._id}`}>
                        <h3 className="font-semibold">
                          {product.title}
                        </h3>
      
                        <p className="text-sm text-subheading">
                          ${product.price}
                        </p>
                      </Link>
      
                      <Link
                        href={`/sellers/products/${product._id}/edit`}
                        className="text-terracotta font-medium"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
      
                </div>
              )}
            </div>
      
          </div>
        </div>
      );
}