import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./components/Provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Meter Balance Checker by BIXBD",
    template: "%s | BIXBD Meter Balance Checker",
  },
  description:
    "Meter Balance Checker by BIXBD with some Analytics ,it is an website that gives you to check meter balance of your all meters at one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
      </body>
    </html>
  );
}
