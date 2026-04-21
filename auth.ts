import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_DOMAINS = ["gocase.com", "gobeaute.com", "gobeaute.com.br", "gogroup.com", "jumpventures.com"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      const domain = (user.email ?? "").split("@").at(-1) ?? "";
      return ALLOWED_DOMAINS.includes(domain);
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
