import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import User from "@/models/userModel";
import { connectDB } from "@/lib/db";

import { authConfig } from "./auth.config";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }

        const validPassword =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!validPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && session) {
        token.name = session.name ?? token.name;
        token.email = session.email ?? token.email;
        token.profileImage = session.profileImage ?? token.profileImage;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      if (token.profileImage) {
        (session.user as any).profileImage = token.profileImage;
      }
      return session;
    },
  },
});