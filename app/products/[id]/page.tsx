'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/app/ui/header';
import StarRating from '@/app/ui/star-rating';
import ReviewForm from '@/app/ui/review-form';



export default function ProductDetailPage() {
  const { id }                        = useParams<{ id: string }>();
  const [product, setProduct]         = useState<any>(null);
  const [seller, setSeller]           = useState<any>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [activeImg, setActiveImg]     = useState(0);
  const [qty, setQty]                 = useState(1);
  const [wishlisted, setWishlisted]   = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);


  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }

        const p = await res.json();
        setProduct(p);

        if (p.seller) {
          const sr = await fetch(`/api/sellers/${p.seller}`);

          if (sr.ok) {
            setSeller(await sr.json())
          };
        }

        const reviewRes = await fetch(
          `/api/reviews/product/${id}`
        );
        
        if (reviewRes.ok) {
          const reviewData = await reviewRes.json();
          setReviews(reviewData);
        }

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);


  async function handleAddToCart() {
    try {
      setAddingToCart(true);
      setCartMessage("");
  
      const response = await fetch(
        "/api/carts",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: qty,
          }),
        }
      );
  
      const data =
        await response.json();
  
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add item"
        );
      }
  
      setCartMessage(
        "Product added to cart"
      );
    } catch (error: any) {
      setCartMessage(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setAddingToCart(false);
    }
  }


  if (loading) return (
    <div className="min-h-screen bg-cream-white">
      <Header />
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-subheading">Loading product...</p>
        </div>
      </div>
    </div>
  );


  if (error || !product) return (
    <div className="min-h-screen bg-cream-white">
      <Header />
      <div className="flex flex-col items-center justify-center h-64 gap-3 px-4 text-center">
        <span className="text-5xl">🏺</span>
        <p className="text-sm text-subheading">{error || 'Product not found'}</p>
        <Link href="/products" className="text-sm font-semibold text-terracotta hover:underline">&larr; Back to Shop</Link>
      </div>
    </div>
  );


  const images: (string | null)[] = product.images?.length ? product.images : [null];
  const inStock = product.stock === undefined || product.stock > 0;

  const accordions = [
    {
      key: 'details',
      label: 'Product Details',
      content: (
        <div className="text-sm text-subheading-dark space-y-2">
          <p><span className="font-semibold text-charcol">Category:</span> {product.category}</p>
          <p><span className="font-semibold text-charcol">Stock:</span> {product.stock ?? 'Available'}</p>
          <p><span className="font-semibold text-charcol">Listed:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      ),
    },
    {
      key: 'shipping',
      label: 'Shipping & Returns',
      content: (
        <div className="text-sm text-subheading-dark space-y-2">
          <p>Free shipping on orders over $50</p>
          <p>Standard delivery: 5-10 business days</p>
          <p>Returns accepted within 30 days of purchase</p>
        </div>
      ),
    },
    {
      key: "reviews",
      label: `Reviews (${product.totalReviews || 0})`,
      content: (
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-subheading">
              No reviews yet.
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-light-orange pb-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-charcol">
                    {review.user?.name}
                  </h4>
    
                  <span className="text-xs text-subheading">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>
    
                <StarRating
                  rating={review.rating}
                  count={0}
                />
    
                <p className="text-sm text-subheading-dark mt-2">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      ),
    },
  ];


  return (
    <div className="min-h-screen bg-cream-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6 pb-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-subheading mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-terracotta transition-colors">Shop</Link>
          <span>›</span>
          <span className="text-charcol font-medium line-clamp-1">{product.title}</span>
        </nav>

        {/* Two columns on desktop, stacked on mobile */}
        <div className="md:grid md:grid-cols-2 md:gap-10 lg:gap-16">

          {/* Left (images) */}
          <div>
            {/* Main image */}
            <div className="relative w-full aspect-square bg-light-orange rounded-2xl overflow-hidden mb-3">
              {images[activeImg]
                ? <img src={images[activeImg]!} alt={product.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-8xl">🏺</div>}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.featured && (
                  <span className="bg-olive-green text-white text-[10px] font-bold px-2.5 py-1 rounded-full">⭐ Bestseller</span>
                )}
                {!inStock && (
                  <span className="bg-subheading text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Out of stock</span>
                )}
              </div>
              <button onClick={() => setWishlisted(!wishlisted)} className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center border border-light-orange shadow-sm hover:border-terracotta transition-colors" aria-label="Toggle wishlist">
                <svg className={`w-4 h-4 transition-colors ${wishlisted ? 'text-terracotta fill-terracotta' : 'text-subheading'}`} fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-terracotta' : 'border-transparent'}`}>
                    {img
                      ? <img src={img} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-light-orange flex items-center justify-center text-2xl">🏺</div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right (info) */}
          <div className="mt-6 md:mt-0">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-charcol leading-snug mb-2">{product.title}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-terracotta">${product.price?.toFixed(2)}</span>
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <span className="text-xs text-terracotta font-semibold bg-light-orange px-2.5 py-1 rounded-full">Only {product.stock} left!</span>
              )}
            </div>

            <div className="mb-4">
              <StarRating rating={product.averageRating || 0} count={product.totalReviews} />
            </div>

            <p className="text-sm md:text-base text-subheading-dark leading-relaxed mb-5">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['Handmade', 'Eco-friendly', 'Unique Piece'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs font-medium text-olive-green bg-green-pastel px-3 py-1.5 rounded-full border border-sage-green">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>

            {/* Seller */}
            {seller && (
              <div className="bg-white rounded-2xl border border-light-orange p-4 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-light-orange overflow-hidden flex items-center justify-center flex-shrink-0">
                      {seller.profileImage
                        ? <img src={seller.profileImage} alt={seller.name} className="w-full h-full object-cover" />
                        : <span className="text-xl">😀</span>}
                    </div>

                    <div>
                      <p className="text-[11px] text-subheading">Artisan</p>
                      <p className="text-sm font-bold text-charcol">{seller.name}</p>
                      {seller.specialty && <p className="text-[11px] text-subheading">{seller.specialty}</p>}
                    </div>
                  </div>
                  <Link href={`/sellers/${seller._id}`} className="text-xs font-semibold text-terracotta hover:underline">View Profile &rarr;</Link>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-charcol mb-2">Quantity</label>

              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-xl border border-light-orange bg-white flex items-center justify-center text-lg text-charcol hover:border-terracotta hover:bg-terra-dark/20 transition-colors cursor-pointer">−</button>
                <span className="w-8 text-center text-base font-bold text-charcol">{qty}</span>

                <button onClick={() => setQty(Math.min(product.stock || 99, qty + 1))} disabled={!inStock} className="w-9 h-9 rounded-xl border border-light-orange bg-white flex items-center justify-center text-lg text-charcol hover:border-terracotta hover:bg-terra-dark/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">+</button>
                {product.stock !== undefined && (
                  <span className="text-xs text-subheading">{product.stock} in stock</span>
                )}
              </div>
            </div>

            {/* CTA's */}
            <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!inStock || addingToCart}
              className="flex-1 bg-terracotta text-white text-sm font-bold py-3.5 rounded-xl hover:bg-terra-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart
                ? "Adding..."
                : inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </button>
              <button onClick={() => setWishlisted(!wishlisted)}
                className={`flex-1 text-sm font-bold py-3.5 rounded-xl border transition-colors ${wishlisted ? 'bg-terra-dark/20 text-terracotta border-terracotta' : 'bg-white text-charcol border-light-orange hover:border-terracotta hover:bg-terra-dark/20'}`}>
                {wishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
              </button>
              {cartMessage && (
                <p
                  className={`text-sm mt-3 ${
                    cartMessage.includes("added")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {cartMessage}
                </p>
              )}
            </div>

            {/* Accordion */}
            <div className="bg-white rounded-2xl border border-light-orange divide-y divide-light-orange overflow-hidden">
              {accordions.map(({ key, label, content }) => (
                <div key={key}>
                  <button onClick={() => setOpenSection(openSection === key ? null : key)}
                    className="w-full flex items-center justify-between px-4 py-4 text-left" aria-expanded={openSection === key}>
                    <span className="text-sm font-semibold text-charcol">{label}</span>
                    <span className={`text-subheading text-lg transition-transform duration-200 ${openSection === key ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openSection === key && <div className="px-4 pb-4">{content}</div>}
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white border border-light-orange rounded-2xl p-4">
                <h3 className="font-bold text-lg mb-4">
                  Write a Review
                </h3>

                <ReviewForm productId={product._id} />
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}