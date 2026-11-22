import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import { profile, siteUrl } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** 和文は文字数が多いためプリロードせず、必要な文字だけを読み込ませる */
const notoSansJp = Noto_Sans_JP({
  weight: ["300", "400"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
      className={`${inter.variable} ${notoSansJp.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
