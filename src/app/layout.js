import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const suseFont = localFont({
  src: "./fonts/SuseVF.ttf",
  variable: "--font-suse",
  weight: "100 800",
});

export const metadata = {
  title: {
    default: "WallPict Admin",
    template: "%s | WallPict Admin",
  },
  description: "Admin Panel for WallPict android app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${suseFont.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          {/* Main content should grow to take up available space */}
          <main className="bg-background text-text flex-grow w-full">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
