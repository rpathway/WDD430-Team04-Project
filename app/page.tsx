import Link from 'next/link';
import Header from '@/app/ui/header';
import StarRating from '@/app/ui/star-rating';


const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';



async function getFeaturedProducts() {
  try {
    const res = await fetch(`${BASE}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];

    const data = await res.json();

    return (Array.isArray(data) ? data : []).filter((p: any) => p.featured).slice(0, 8);
  } catch {
    return [];
  }
}

async function getSellers() {
  try {
    const res = await fetch(`${BASE}/api/sellers`, { cache: 'no-store' });
    if (!res.ok) return [];

    const data = await res.json();

    return (Array.isArray(data) ? data : []).slice(0, 6);
  } catch {
    return [];
  }
}

// Maybe use Hugeicons lib for the icons in the future? For now it's emoji's
const CATEGORIES = [
  { name: 'Jewelry',     tag: 'jewelry',     icon: '📿' },
  { name: 'Pottery',     tag: 'pottery',     icon: '🏺' },
  { name: 'Fashion',     tag: 'fashion',     icon: '👗' },
  { name: 'Home Decor',  tag: 'home-decor',  icon: '🕯️' },
  { name: 'Paintings',   tag: 'paintings',   icon: '🖼️' },
  { name: 'Accessories', tag: 'accessories', icon: '👜' },
];

 

export default async function HomePage() {
  const [featuredProducts, sellers] = await Promise.all([getFeaturedProducts(), getSellers()]);

  return (
    <div className="min-h-screen bg-cream-white">
      <Header />

      {/* Hero */}
      <section className="bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-6 md:py-16 md:flex md:items-center md:gap-12">

          {/* Text side */}
          <div className="md:flex-1 mb-6 md:mb-0">
            <p className="text-xs font-semibold text-olive-green tracking-widest uppercase mb-2">Handmade with love</p>
            <h1 className="font-serif text-[2rem] md:text-5xl font-bold text-charcol leading-tight mb-3 max-w-3xl">
              Discover Unique Handmade Treasures from Local Sellers
            </h1>
            <p className="text-sm md:text-base text-subheading-dark leading-relaxed mb-5 md:max-w-lg">
              Support local talent and sustainable handcrafted products from sellers around the world.
            </p>

            <div className="flex gap-3">
              <Link href="/products" className="bg-terracotta text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-terra-dark transition-colors shadow-sm">
                Shop Now
              </Link>
              <Link href="/sellers" className="bg-white text-terracotta text-sm font-semibold px-5 py-2.5 rounded-xl border border-terracotta hover:bg-terracotta/10 transition-colors">
                Become a Seller
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* badges */}
      <section className="bg-white border-y border-warm-beige">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide md:justify-center md:flex-wrap">
            {[
              { label: 'Unique & Handmade',     icon: '✋' },
              { label: 'Support Local Sellers', icon: '🤝' },
              { label: 'Secure Payments',       icon: '🔒'},
            ].map((b) => (
              <div key={b.label} className="flex-shrink-0 flex items-center gap-2">
                <span className="text-base">{b.icon}</span>
                <span className="text-xs font-medium text-light whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-charcol">Shop by Category</h2>
            <Link href="/products" className="text-xs font-semibold text-terracotta hover:underline">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link key={cat.tag} href={`/products?category=${cat.tag}`}
                className="flex flex-col items-center gap-2 bg-white rounded-2xl py-5 border border-warm-beige hover:border-terracotta hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-cream-white rounded-full flex items-center justify-center text-2xl">{cat.icon}</div>
                <span className="text-xs font-semibold text-charcol text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-charcol">Featured Items</h2>
            <Link href="/products" className="text-xs font-semibold text-terracotta hover:underline">View all &rarr;</Link>
          </div>
          {featuredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-warm-beige p-12 text-center">
              <p className="text-4xl mb-3">🏺</p>
              <p className="text-sm text-subheading mb-2">No featured items yet.</p>
              <Link href="/sellers" className="text-xs text-terracotta font-semibold hover:underline">List your first product &rarr;</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {featuredProducts.map((p: any) => (
                <Link key={p._id} href={`/products/${p._id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-warm-beige hover:border-terracotta hover:shadow-lg transition-all">
                  <div className="aspect-square bg-warm-beige overflow-hidden">
                    {p.images?.[0]
                      ? <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full flex items-center justify-center text-5xl">🏺</div>}
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-charcol line-clamp-2 mb-1">{p.title}</p>
                    <p className="text-sm font-bold text-terracotta mb-1">${p.price?.toFixed(2)}</p>
                    <StarRating rating={p.averageRating || 0} count={p.totalReviews} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Meet Sellers */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-charcol">Meet Our Sellers</h2>
            <Link href="/sellers" className="text-xs font-semibold text-terracotta hover:underline">View all &rarr;</Link>
          </div>
          {sellers.length === 0 ? (
            <p className="text-sm text-[#9B8878] text-center py-6">No sellers yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {sellers.map((s: any) => (
                <Link key={s._id} href={`/sellers/${s._id}`}
                  className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-warm-beige hover:border-terracotta hover:shadow-md transition-all">
                  <div className="w-14 h-14 rounded-full bg-warm-beige overflow-hidden flex items-center justify-center">
                    {s.profileImage
                      ? <img src={s.profileImage} alt={s.name} className="w-full h-full object-cover" />
                      : <span className="text-2xl">😀</span>}
                  </div>
                  <p className="text-xs font-bold text-charcol text-center">{s.name}</p>
                  <p className="text-[11px] text-subheading text-center">{s.specialty || s.location || 'Seller'}</p>
                  <StarRating rating={s.ratingsAverage || 0} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seller CTA */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-charcol rounded-2xl p-8 md:p-12 text-center md:flex md:items-center md:justify-between md:text-left">
            <div className="md:max-w-lg mb-4 md:mb-0">
              <p className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Share your craft with the world</p>
              <p className="text-sm text-subheading leading-relaxed">Join our community of sellers and start selling today.</p>
            </div>
            <Link href="/sellers" className="inline-block bg-terracotta text-white text-sm font-semibold px-8 py-3 rounded-xl hover:bg-terra-dark transition-colors flex-shrink-0">
              Become a Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcol px-4 pt-8 pb-8 text-subheading">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <span className="font-serif text-white text-lg font-bold block leading-none">Handcrafted</span>
            <span className="text-[10px] tracking-[0.2em] text-terracotta font-semibold">HAVEN</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs mb-8">
            {[
              { heading: 'About Us',
                links: [
                  'Our Story',
                  'Mission & Values',
                  'Seller Guidelines'
                ]
              },
              { heading: 'Customer Service',
                links: [
                  'FAQs',
                  'Shipping & Returns',
                  'Contact Us'
                ]
              },
              { heading: 'Policies',
                links: [
                  'Privacy Policy',
                  'Terms & Conditions',
                  'Refund Policy'
                ]
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-white font-semibold mb-3">{heading}</p>
                {links.map((l) => <p key={l} className="mb-1.5 hover:text-white cursor-pointer transition-colors">{l}</p>)}
              </div>
            ))}
          </div>

          <div className="border-t border-light pt-4 text-[10px] text-center text-subheading">
            &copy; 2024 Handcrafted Haven. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
}
