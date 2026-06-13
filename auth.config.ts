import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  providers: [],

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isSellerRoute = nextUrl.pathname.startsWith("/seller");
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isBuyerRoute = nextUrl.pathname.startsWith("/profile"); // Protected buyer route

      // If they are attempting to hit ANY dashboard and aren't logged in, block them
      if (isAdminRoute || isSellerRoute || isBuyerRoute) {
        if (isLoggedIn) return true;
        return false; // Redirects to /login
      }

      return true;
    },
  },
} satisfies NextAuthConfig;