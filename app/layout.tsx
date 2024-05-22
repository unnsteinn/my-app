import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { NavigationMenuDemo } from "@/components/navigation-bar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Logo from "@/public/lil-bits.svg";
import Image from "next/image";

// Define RootLayoutProps interface
interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen mx-4 sm:mx-8 md:mx-20 lg:mx-40 my-10 sm:my-20 bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="/" className="flex justify-center">
            <Image
              className="w-max sm:w-3/4 md:1/2"
              src={Logo}
              alt="Lil-bits logo"
            ></Image>
          </a>

          <div>
            <div className="flex justify-between m-10">
              <NavigationMenuDemo />
              <ModeToggle />
            </div>
          </div>
          <TailwindIndicator />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
