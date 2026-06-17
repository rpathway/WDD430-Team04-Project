'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import LogoutButton from './logoutButton';
import { useSession } from 'next-auth/react';
import { useCart } from '@/app/context/cartContext';
import { useRouter } from "next/navigation";

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'Shop',       href: '/products' },
  { label: 'Artisans',   href: '/sellers' },
  // { label: 'Categories', href: '/products' },
];


export default function Header() {
  const router                        = useRouter();
  const { data: session }             = useSession();
  const [menuOpen, setMenuOpen]       = useState(false);
  const { cartCount }                 = useCart();
  const [searchTerm, setSearchTerm]   = useState("");
  const [results, setResults]         = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching]     = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchTerm)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.slice(0, 6));
          setShowResults(true);
        }
      } catch {} finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(productId: string) {
    setShowResults(false);
    setSearchTerm("");
    router.push(`/products/${productId}`);
  }

  return (
    <header className="bg-white border-b border-warm-beige sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Single row on desktop, two rows on mobile */}
        <div className="flex items-center gap-3 py-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-lg font-bold text-charcol leading-none block">Handcrafted</span>
            <span className="text-[10px] tracking-[0.2em] text-terracotta font-semibold block">HAVEN</span>
          </Link>

          {/* Nav (hidden on mobile, inline on desktop) */}
          <nav className="hidden md:flex items-center gap-0.5 flex-shrink-0" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="text-xs text-subheading-dark font-medium px-3 py-1.5 rounded-lg hover:bg-cream-white hover:text-terracotta transition-colors whitespace-nowrap">
                {label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 relative min-w-0" ref={searchRef}>
            <div className="flex items-center bg-cream-white border border-warm-beige rounded-xl px-3 py-2 gap-2">
              <svg className="w-4 h-4 text-olive-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search handcrafted items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowResults(true)}
                className="bg-transparent text-sm text-charcol placeholder-subheading outline-none w-full min-w-0"
              />
            </div>

            {showResults && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-warm-beige rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                {searching ? (
                  <p className="px-4 py-3 text-sm text-subheading">Searching...</p>
                ) : results.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-subheading">No results found.</p>
                ) : (
                  results.map((product: any) => (
                    <button
                      key={product._id}
                      onClick={() => handleSelect(product._id)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-cream-white text-left transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-charcol font-medium truncate">{product.title}</span>
                      <span className="text-xs text-subheading ml-auto">${product.price}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Cart & auth */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/carts" className="relative p-1">
              <svg className="w-6 h-6 text-charcol" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-terracotta text-white text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            </Link>
            {session ? (
                <>
                  <Link
                      href={
                        session.user.role === "seller"
                          ? "/sellers/dashboard"
                          : "/profile"
                      }
                      className="hidden sm:block text-xs font-medium text-charcol hover:text-terracotta transition-colors px-1"
                    >
                      Hi, {session.user.name}
                  </Link>

                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:block text-xs font-medium text-charcol hover:text-terracotta transition-colors px-1"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-terracotta text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-terra-dark transition-colors whitespace-nowrap"
                  >
                    Sign Up
                  </Link>
                </>
              )}

            {/* Hamburger (mobile) */}
            <button className="md:hidden p-1.5 rounded-lg hover:bg-cream-white transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <svg className="w-5 h-5 text-charcol" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav className="md:hidden pb-3 border-t border-warm-beige pt-2" aria-label="Mobile navigation">
            <div className="flex flex-col gap-0.5">
              {navLinks.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="text-sm text-subheading-dark font-medium px-3 py-2.5 rounded-lg hover:bg-cream-white hover:text-terracotta transition-colors">
                  {label}
                </Link>
              ))}

              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm text-subheading-dark font-medium px-3 py-2.5 rounded-lg hover:bg-cream-white hover:text-terracotta transition-colors sm:hidden">
                Login
              </Link>

            </div>
          </nav>
        )}

      </div>
    </header>
  );
}
