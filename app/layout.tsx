import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { EditModeProvider } from "@/context/EditModeContext";
import { BrandProvider } from "@/context/BrandContext";

export const metadata: Metadata = {
  title: "Gogroup Tech · Onboarding",
  description: "Plataforma de onboarding do time de tecnologia da Gogroup",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <SessionProvider session={session}>
          <BrandProvider><EditModeProvider>{children}</EditModeProvider></BrandProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
