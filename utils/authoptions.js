import GoogleProvider from "next-auth/providers/google";
import ConnectDB from "@/config/connected";
import User from "@/models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code'
        }
      }
    }),
  ],
}
