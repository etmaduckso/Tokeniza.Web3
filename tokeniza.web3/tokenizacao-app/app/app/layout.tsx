import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { WalletConnect } from "@/components/wallet-connect";
import { NetworkSelector } from "@/components/network-selector";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tokenização de Ativos - Simulador Educativo",
  description: "Aprenda sobre tokenização de ativos do mundo real através de simulação interativa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-xl font-bold">
                  Tokenização
                </Link>
                <Link href="/learn" className="hover:text-blue-600">
                  Aprenda
                </Link>                <Link href="/simulation" className="hover:text-blue-600">
                  Simulação
                </Link>
                <Link href="/testnet" className="hover:text-blue-600">
                  Testnet
                </Link>
                <Link href="/tokenize" className="hover:text-blue-600">
                  Tokenize seus Ativos
                </Link>
                <Link href="/marketplace" className="hover:text-blue-600">
                  Marketplace
                </Link>              </div>
              <div className="flex items-center space-x-3">
                <NetworkSelector />
                <WalletConnect />
              </div>
            </div>
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}