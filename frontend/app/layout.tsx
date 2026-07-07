import type { Metadata } from "next";
import { OnboardingGate } from "./OnboardingGate";
import "./styles.css";

export const metadata: Metadata = {
  title: "Community Agent",
  description: "A first prototype for community AI role agents"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <OnboardingGate>{children}</OnboardingGate>
      </body>
    </html>
  );
}

