import Link from 'next/link';
import StarRating from '@/app/ui/star-rating';

export const metadata = { title: 'Meet Our Artisans' };

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function getSellers() {
  try {
    const res = await fetch(`${BASE}/api/sellers`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function SellersPage() {
  const sellers = await getSellers();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-subheading mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
        <span>›</span>
        <span className="text-charcol font-medium">Artisans</span>
      </nav>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcol mb-2">Meet Our Artisans</h1>
        <p className="text-sm text-subheading">
          Talented creators. Unique stories. Handmade with love.
        </p>
      </div>

      {/* Grid */}
      {sellers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <span className="text-5xl">🧑‍🎨</span>
          <p className="text-sm text-subheading">No artisans found yet.</p>
          <Link href="/" className="text-xs text-terracotta font-semibold hover:underline">
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sellers.map((seller: any) => (
            <div
              key={seller._id}
              className="bg-white rounded-2xl border border-warm-beige overflow-hidden hover:border-terracotta hover:shadow-lg transition-all"
            >
              {/* Avatar */}
              <div className="bg-light-orange h-28 flex items-center justify-center">
                {seller.profileImage ? (
                  <img
                    src={seller.profileImage}
                    alt={seller.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-warm-beige border-4 border-white shadow flex items-center justify-center text-3xl">
                    🧑‍🎨
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h2 className="font-serif text-base font-bold text-charcol mb-0.5">
                  {seller.name || 'Artisan'}
                </h2>

                {seller.specialty && (
                  <p className="text-xs text-terracotta font-medium mb-1">{seller.specialty}</p>
                )}

                {seller.location && (
                  <p className="text-xs text-subheading mb-2">📍 {seller.location}</p>
                )}

                {(seller.ratingsAverage > 0 || seller.totalReviews > 0) && (
                  <div className="flex justify-center mb-3">
                    <StarRating rating={seller.ratingsAverage || 0} count={seller.totalReviews} />
                  </div>
                )}

                {seller.bio && (
                  <p className="text-xs text-subheading-dark line-clamp-2 mb-3">{seller.bio}</p>
                )}

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/sellers/${seller._id}`}
                    className="flex-1 text-xs font-semibold text-terracotta border border-terracotta rounded-xl py-2 hover:bg-terracotta hover:text-white transition-colors text-center"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/products?seller=${seller._id}`}
                    className="flex-1 text-xs font-semibold bg-terracotta text-white rounded-xl py-2 hover:bg-terra-dark transition-colors text-center"
                  >
                    View Shop
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
