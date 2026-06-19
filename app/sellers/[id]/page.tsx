'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import StarRating from '@/app/ui/star-rating';

export default function SellerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/sellers/${id}`);
        if (!res.ok) throw new Error('Artisan not found');
        const s = await res.json();
        setSeller(s);

        // Fetch all products and filter by this seller
        const pr = await fetch('/api/products');
        if (pr.ok) {
          const all = await pr.json();
          if (Array.isArray(all)) {
            setProducts(all.filter((p: any) => String(p.seller) === String(s.user?._id)));
          }
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);


  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-subheading">Loading artisan profile...</p>
      </div>
    </div>
  );

  if (error || !seller) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 px-4 text-center">
      <span className="text-5xl">🧑‍🎨</span>
      <p className="text-sm text-subheading">{error || 'Artisan not found'}</p>
      <Link href="/sellers" className="text-sm font-semibold text-terracotta hover:underline">
        &larr; Back to Artisans
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pb-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-subheading mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
        <span>›</span>
        <Link href="/sellers" className="hover:text-terracotta transition-colors">Artisans</Link>
        <span>›</span>
        <span className="text-charcol font-medium line-clamp-1">{seller.user?.name || 'Profile'}</span>
      </nav>

      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-warm-beige p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-light-orange overflow-hidden flex-shrink-0 flex items-center justify-center border-4 border-warm-beige shadow">
            {seller.user?.profileImage
              ? <img src={seller.user?.profileImage} alt={seller.user?.name} className="w-full h-full object-cover" />
              : <span className="text-4xl">🧑‍🎨</span>}
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="font-serif text-2xl font-bold text-charcol">{seller.user?.name || 'Artisan'}</h1>
              {seller.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-olive-green bg-green-pastel px-2.5 py-1 rounded-full border border-sage-green">
                  ✓ Verified
                </span>
              )}
            </div>

            {seller.specialty && (
              <p className="text-sm text-terracotta font-medium mb-1">{seller.specialty}</p>
            )}

            {seller.location && (
              <p className="text-xs text-subheading mb-2">📍 {seller.location}</p>
            )}

            {(seller.ratingsAverage > 0 || seller.totalReviews > 0) && (
              <div className="flex justify-center sm:justify-start mb-3">
                <StarRating rating={seller.ratingsAverage || 0} count={seller.totalReviews} />
              </div>
            )}

            {seller.bio && (
              <p className="text-sm text-subheading-dark leading-relaxed max-w-xl">{seller.bio}</p>
            )}

            {/* Social links */}
            {(seller.socialLinks?.instagram || seller.socialLinks?.facebook || seller.socialLinks?.website) && (
              <div className="flex gap-3 mt-3 justify-center sm:justify-start">
                {seller.socialLinks?.instagram && (
                  <a href={seller.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-terracotta font-medium hover:underline">
                    Instagram
                  </a>
                )}
                {seller.socialLinks?.facebook && (
                  <a href={seller.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-terracotta font-medium hover:underline">
                    Facebook
                  </a>
                )}
                {seller.socialLinks?.website && (
                  <a href={seller.socialLinks.website} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-terracotta font-medium hover:underline">
                    Website
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex sm:flex-col gap-4 sm:gap-2 text-center flex-shrink-0">
            <div className="bg-cream-white rounded-xl px-4 py-3">
              <p className="text-lg font-bold text-terracotta">{products.length}</p>
              <p className="text-[11px] text-subheading">Products</p>
            </div>
            <div className="bg-cream-white rounded-xl px-4 py-3">
              <p className="text-lg font-bold text-terracotta">{seller.totalReviews || 0}</p>
              <p className="text-[11px] text-subheading">Reviews</p>
            </div>
          </div>

        </div>
      </div>

      {/* Products by this seller */}
      <div>
        <h2 className="font-serif text-xl font-bold text-charcol mb-4">
          {seller.user?.name ? `${seller.user?.name}'s Products` : 'Products'}
        </h2>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl border border-warm-beige">
            <span className="text-4xl">🏺</span>
            <p className="text-sm text-subheading">No products listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((product: any) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-warm-beige hover:border-terracotta hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="aspect-square bg-warm-beige relative overflow-hidden">
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    : <div className="w-full h-full flex items-center justify-center text-5xl">🏺</div>}

                  {product.featured && (
                    <span className="absolute top-2 left-2 bg-olive-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}

                  {/* Wishlist icon */}
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-warm-beige shadow-sm">
                    <svg className="w-3.5 h-3.5 text-subheading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-charcol line-clamp-2 leading-snug mb-1">
                    {product.title}
                  </p>
                  <p className="text-sm font-bold text-terracotta mb-1.5">
                    ${product.price?.toFixed(2)}
                  </p>
                  <StarRating rating={product.averageRating || 0} count={product.totalReviews} />
                  {product.stock !== undefined && product.stock <= 3 && product.stock > 0 && (
                    <p className="text-[10px] text-terracotta font-medium mt-1">Only {product.stock} left!</p>
                  )}
                  {product.stock === 0 && (
                    <p className="text-[10px] text-subheading font-medium mt-1">Out of stock</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
