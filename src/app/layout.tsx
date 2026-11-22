import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { profile, siteUrl } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${profile.displayName}`,
    default: `${profile.displayName}'s portfolio`,
  },
  description: `${profile.displayName} のポートフォリオ。UFOキャッチャーで作品を集めるゲーム型サイトです。`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
