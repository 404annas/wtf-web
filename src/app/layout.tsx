import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WTF - We're The Future",
  description:
    "WTF is a student-led organization dedicated to fostering innovation, creativity, and collaboration among students. We provide a platform for students to explore their passions, develop their skills, and connect with like-minded individuals. Our mission is to empower students to become the future leaders and innovators of tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <SmoothScrollProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </SmoothScrollProvider>
    </html>
  );
}
