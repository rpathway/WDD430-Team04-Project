import Link from 'next/link';
import Header from '@/app/ui/header';
import StarRating from '@/app/ui/star-rating';


const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';



async function getProducts() {
  try {
    const res = await fetch(`${BASE}/api/products`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}


const CATEGORIES = [
  { label: 'All',         tag: 'all' },
  { label: 'Jewelry',     tag: 'jewelry' },
  { label: 'Pottery',     tag: 'pottery' },
  { label: 'Fashion',     tag: 'fashion' },
  { label: 'Home Decor',  tag: 'home-decor' },
  { label: 'Accessories', tag: 'accessories' },
  { label: 'Paintings',   tag: 'paintings' },
];

const SORT_OPTIONS = [
  { label: 'Newest',     value: 'newest' },
  { label: 'Price Asc',  value: 'price-asc' },
  { label: 'Price Desc', value: 'price-desc' },
  { label: 'Top Rated',  value: 'rating' },
];


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const {
    category = 'all',
    sort = 'newest'
  } = await searchParams;

  let products = await getProducts();

  if (category !== 'all') {
    products = products.filter((p: any) => p.category?.toLowerCase().replace(/\s+/g, '-') === category);
  }

  const sorted = [...products].sort((a: any, b: any) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating')     return (b.averageRating || 0) - (a.averageRating || 0);

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const activeCatLabel = CATEGORIES.find((c) => c.tag === category)?.label;


  return (
    <div className="min-h-screen bg-cream-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-subheading mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>›</span>
          <span className="text-charcol font-medium">Shop</span>
        </nav>

        <div className="md:flex md:items-start md:gap-8">

          {/* Sidebar filters (desktop only) */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-warm-beige p-4 sticky top-24">
              <p className="text-sm font-bold text-charcol mb-3">Categories</p>
              <div className="flex flex-col gap-0.5">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.tag} href={`/products?category=${cat.tag}&sort=${sort}`} className={`text-sm px-3 py-2 rounded-xl transition-colors ${category === cat.tag ? 'bg-terracotta text-white font-semibold' : 'text-subheading-dark hover:bg-cream-white hover:text-terracotta'}`}>
                    {cat.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-warm-beige mt-4 pt-4">
                <p className="text-sm font-bold text-charcol mb-3">Sort By</p>
                <div className="flex flex-col gap-0.5">
                  {SORT_OPTIONS.map((opt) => (
                    <Link key={opt.value} href={`/products?category=${category}&sort=${opt.value}`} className={`text-sm px-3 py-2 rounded-xl transition-colors ${sort === opt.value ? 'bg-charcol text-white font-semibold' : 'text-subheading-dark hover:bg-cream-white'}`}>
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-serif text-2xl font-bold text-charcol">
                  {activeCatLabel && activeCatLabel !== 'All' ? activeCatLabel : 'All Products'}
                </h1>
                <p className="text-xs text-subheading mt-0.5">{sorted.length} result{sorted.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Categories (mobile only) */}
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 mb-3 md:hidden scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Link key={cat.tag} href={`/products?category=${cat.tag}&sort=${sort}`} className={`flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${category === cat.tag ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-subheading-dark border-warm-beige hover:border-terracotta'}`}>
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Sorting (mobile only) */}
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-3 mb-4 md:hidden scrollbar-hide">
              <span className="flex-shrink-0 text-xs text-subheading self-center">Sort:</span>
              {SORT_OPTIONS.map((opt) => (
                <Link key={opt.value} href={`/products?category=${category}&sort=${opt.value}`} className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${sort === opt.value ? 'bg-charcol text-white border-charcol' : 'bg-white text-subheading-dark border-warm-beige hover:border-charcol'}`}>
                  {opt.label}
                </Link>
              ))}
            </div>

            {/* Grid */}
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <span className="text-5xl">🏺</span>
                <p className="text-sm text-subheading">No products found{category !== 'all' ? ' in this category' : ''}.</p>
                <Link href="/products" className="text-xs text-terracotta font-semibold hover:underline">Clear filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {sorted.map((product: any) => (
                  <Link key={product._id} href={`/products/${product._id}`} className="group bg-white rounded-2xl overflow-hidden border border-warm-beige hover:border-terracotta hover:shadow-lg transition-all">

                    <div className="aspect-square bg-warm-beige relative overflow-hidden">
                      {product.images?.[0]
                        ? <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <div className="w-full h-full flex items-center justify-center text-5xl">🏺</div>}

                      <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center border border-warm-beige shadow-sm" aria-hidden="true">
                        <svg className="w-3.5 h-3.5 text-subheading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>

                      {product.featured && (
                        <span className="absolute top-2 left-2 bg-olive-green text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>
                      )}
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-semibold text-charcol line-clamp-2 leading-snug mb-1">{product.title}</p>
                      <p className="text-sm font-bold text-terracotta mb-1.5">${product.price?.toFixed(2)}</p>
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
      </div>
    </div>
  );
}
