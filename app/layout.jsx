import "@/assets/styles/global.css"
import { Poppins } from "next/font/google"
import Navbar from "@/components/navbar"

export const metadata = {
  title: 'Property managment app',
  description: 'A property managemnet app build with nextjs and tailwindcss',
  keywords: 'property, managment, app, nextjs, tailwindcss',
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  )
}
