import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../../utils/mongodb";

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
      const { db } = await connectToDatabase();
      const usersCollection = db.collection("users");

      const existingUser = await usersCollection.findOne({ email: user.email });

      if (!existingUser) {
        await usersCollection.insertOne({
          userId: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          createdAt: new Date(),
          lastLoggedIn: new Date(),
          isAdmin: user.email === process.env.ADMIN_EMAIL, // Set admin status
        });
      } else {
        await usersCollection.updateOne(
          { email: user.email },
          { $set: { lastLoggedIn: new Date(), isAdmin: existingUser.isAdmin || user.email === process.env.ADMIN_EMAIL } } // Ensure admin status is set
        );
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.user = token.user;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
        const { db } = await connectToDatabase();
        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({ email: user.email });
        token.isAdmin = existingUser.isAdmin;
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

export const GET = async (req, res) => {
  return NextAuth(req, res, authOptions);
};

export const POST = async (req, res) => {
  return NextAuth(req, res, authOptions);
};
