import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { BlockchainProviders } from "@/providers/blockchain-providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minifu",
  description: "Earn points, get discounts, and much more 🎉",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-screen-sm mx-auto`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BlockchainProviders>{children}</BlockchainProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
