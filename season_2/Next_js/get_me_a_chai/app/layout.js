import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "fundraiser_app - fund your dreams",
  description: "This is a fundraiser app built with Next.js and Solidity for creators to raise funds for their projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SessionWrapper> */}
        <Navbar />
        <div className="min-h-[75vh]">
          <div class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
          {children}
        </div>
        <Footer />
      {/* </SessionWrapper> */}
      {/* {children} */}
    </body>
    </html >
  );
}
