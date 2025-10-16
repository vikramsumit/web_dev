import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin: Facebook - Connect with friends and the world around you on Facebook.",
  description: "Admin page: Facebook is a social media platform that allows users to connect with friends and family, share photos and videos, and stay updated on news and events.",
};

export default function AdminLayout({ children }) {
  return (
    <>
    <span>Admin Navbar</span>
    {children}
    </>
  );
}
