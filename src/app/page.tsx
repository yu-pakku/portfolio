import Link from "next/link";
import { profile } from "@/data/profile";

const menuItems = [
  { href: "/play", label: "はじめる", description: "UFOキャッチャーで作品を獲得する" },
  { href: "/collection", label: "コレクション", description: "全作品を図鑑で見る" },
  { href: "/character", label: "キャラクター", description: "自己紹介・スキル" },
  { href: "/credits", label: "クレジット", description: "スタッフロールと連絡先" },
] as const;

/** タイトル画面とメインメニュー。起動演出は Phase 3 で実装する。 */
export default function TitlePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-muted font-mono text-sm tracking-[0.4em]">PORTFOLIO</p>
        <h1 className="text-6xl font-black tracking-tight uppercase">
          {profile.displayName}
        </h1>
        <p className="text-muted">{profile.motto}</p>
      </div>

      <nav aria-label="メインメニュー" className="w-full max-w-sm">
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group border-border bg-surface hover:border-foreground focus-visible:border-foreground flex flex-col rounded-lg border px-5 py-3 transition-colors"
              >
                <span className="relative font-bold">
                  <span
                    aria-hidden
                    className="text-foreground absolute -left-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    ▶
                  </span>
                  {item.label}
                </span>
                <span className="text-muted text-sm">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
