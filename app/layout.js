import { Bodoni_Moda, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const description =
  "NOIRÉ is a demonstration maison of extrait perfumes. Oud Noir, Ambre Royale, Rose Obsidienne, and Velvet Smoke — compositions meant to become a signature.";

export const metadata = {
  metadataBase: new URL("https://noire.demo"),
  title: {
    default: "NOIRÉ — A Scent That Stays",
    template: "%s — NOIRÉ",
  },
  description,
  openGraph: {
    title: "NOIRÉ — A Scent That Stays",
    description,
    type: "website",
    locale: "en_NG",
    siteName: "NOIRÉ",
    images: [
      {
        url: "/images/collection.jpg",
        width: 2000,
        height: 1333,
        alt: "Unlabelled glass perfume bottles in dramatic studio light for the NOIRÉ collection.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOIRÉ — A Scent That Stays",
    description,
    images: ["/images/collection.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
