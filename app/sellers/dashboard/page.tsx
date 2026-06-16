import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Seller from "@/models/sellerModel";
import LogoutButton from "@/app/ui/logoutButton";

export default async function SellerDashboard() {
  await connectDB();

  const session = await auth();

  const seller = await Seller.findOne({
    user: session?.user?.id,
  }).populate("user");

  return (
    <main className="mb-30 bg-stone-50 px-4 py-5">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
        <div className="p-8 space-y-4">
          <h1 className="text-3xl font-bold">
            Seller Dashboard
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

          <h2 className="text-xl font-semibold">
            Seller Information
          </h2>

          {seller ? (
            <>
              <p>
                <strong>Seller ID:</strong>{" "}
                {seller._id.toString()}
              </p>

              <p>
                <strong>Bio:</strong>{" "}
                {seller.bio}
              </p>

              <p>
                <strong>Specialty:</strong>{" "}
                {seller.specialty}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {seller.location}
              </p>

              <p>
                <strong>Instagram:</strong>{" "}
                {seller.socialLinks?.instagram}
              </p>

              <p>
                <strong>Facebook:</strong>{" "}
                {seller.socialLinks?.facebook}
              </p>

              <p>
                <strong>Website:</strong>{" "}
                {seller.socialLinks?.website}
              </p>

              <p>
                <strong>Average Rating:</strong>{" "}
                {seller.ratingsAverage}
              </p>

              <p>
                <strong>Total Reviews:</strong>{" "}
                {seller.totalReviews}
              </p>

              <p>
                <strong>Verified:</strong>{" "}
                {seller.isVerified ? "Yes" : "No"}
              </p>

              <p>
                <strong>Products Count:</strong>{" "}
                {seller.products?.length}
              </p>

              <hr />

              <h2 className="text-xl font-semibold">
                Populated User
              </h2>

              <p>
                <strong>Name:</strong>{" "}
                {seller.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {seller.user?.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {seller.user?.role}
              </p>

              <p>
                <strong>Profile Image:</strong>{" "}
                {seller.user?.profileImage}
              </p>
            </>
          ) : (
            <p className="text-red-500">
              No seller profile found for this user.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}