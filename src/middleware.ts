import { withAuth } from "next-auth/middleware";

const adminEmails = process.env.ADMIN_EMAILS?.split(" ") || [];

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (!token?.email) {
          return false;
        }
        return adminEmails.includes(token?.email);
      }
      return false;
    },
  },
});

export const config = {
  matcher: "/dashboard",
};
