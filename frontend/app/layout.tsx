import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}

