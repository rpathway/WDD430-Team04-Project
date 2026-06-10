import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // Import your config instead

// Initialize NextAuth with ONLY the edge-safe config for middleware
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/seller/:path*",
    "/admin/:path*",
    "/profile/:path*",
  ],
};