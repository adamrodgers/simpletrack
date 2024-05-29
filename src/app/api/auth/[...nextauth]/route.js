import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedEmails = process.env.ALLOWED_EMAILS.split(",");
      return allowedEmails.includes(user.email);
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
};

const setNoCacheHeaders = (res) => {
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("Surrogate-Control", "no-store");
};

export const GET = async (req, res) => {
  const response = await NextAuth(req, res, authOptions);
  setNoCacheHeaders(response);
  return response;
};

export const POST = async (req, res) => {
  const response = await NextAuth(req, res, authOptions);
  setNoCacheHeaders(response);
  return response;
};
