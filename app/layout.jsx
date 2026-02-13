import "@/assets/styles/global.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SessionProviderComponent from "@/components/SessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "@/context/globalcontext";

export const metadata = {
  title: "Property managment app",
  description: "A property managemnet app build with nextjs and tailwindcss",
  keywords: "property, managment, app, nextjs, tailwindcss",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <SessionProviderComponent>
      <GlobalContextProvider>
        <html lang="en">
          <body className={poppins.className}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalContextProvider>
    </SessionProviderComponent>
  );
}
