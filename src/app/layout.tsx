import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Sidebar from "./_components/ui/Sidebar";
import { ModalProvider } from "~/lib/providers/modalProvider";
import { SigninModal } from "./_components/ui/Moda";
import GlobalProvider from "~/lib/providers/GlobalProvider";
import Menu from "./_components/ui/Menu";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/Logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
      <main className={`w-full h-[100vh] bg-darkBlue flex justify-center items-center overflow-hidden`}>
        <TRPCReactProvider>
        <GlobalProvider>
          <ModalProvider>
          <Sidebar  />
          <Menu/>
          <SigninModal/>
          {children}
        </ModalProvider>
        </GlobalProvider>
        </TRPCReactProvider>
      </main>
      </body>
    </html>
  );
}
