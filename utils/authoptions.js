import GoogleProvider from "next-auth/providers/google";
import ConnectDB from "@/config/connected";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await ConnectDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const username = profile.name.slice(0, 20);

          await User.create({
            email: profile.email,
            username,
            image: profile.image,
          });
        }
        return true; // Allow sign-in
      } catch (error) {
        console.log("Error in signIn callback:", error);
      };
      
    },
    async session({ session }) {
        try {
         const user = await User.findOne({ email: session.user.email });
         session.user.id = user._id.toString();
         return session;
        } catch (error) {
            console.log("Error in session callback:", error);
        }
      }
  },
};
