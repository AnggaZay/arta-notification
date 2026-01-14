import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // BATASI: Cuma email tertentu (email lu/tim) yang bisa masuk
      const allowedEmails = ['anggazaidan4@gmail.com', 'email_partner@gmail.com'];
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false; // Email lain ditolak meskipun punya akun Google
    },
  },
});

export { handler as GET, handler as POST };