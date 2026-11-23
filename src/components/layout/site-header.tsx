"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OptionsMenu, SoundToggle } from "@/components/options/options-menu";
import { mainMenu } from "@/data/menu";
import { profile } from "@/data/profile";

type ScreenLabel = {
  /** スマホ幅では省く部分 */
  prefix?: string;
  name: string;
  /** スマホ幅では丸ごと出さない */
  hideOnMobile?: boolean;
};

/** 今いる画面の名前。タイトル画面以外はメインメニューの番号と名前を出す */
function getScreenLabel(pathname: string): ScreenLabel | null {
  if (pathname === "/") return { name: "PORTFOLIO — 2026", hideOnMobile: true };
  const current = mainMenu.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return current ? { prefix: current.number, name: current.label.toUpperCase() } : null;
}

/**
 * 全ページ共通のヘッダー。root layout に置き、ページを移動しても作り直さない。
 * 左：yuma（タイトル画面へのリンク）と今いる画面の名前 / 右：効果音とオプション
 */
export function SiteHeader() {
  const pathname = usePathname();
  const label = getScreenLabel(pathname);

  return (
    <header
      // ページ遷移のアニメーション中もヘッダーは動かさない（globals.css）
      style={{ viewTransitionName: "site-header" }}
      className="flex items-center justify-between gap-4 px-4 py-4 sm:px-12 sm:py-5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/"
          aria-label={`${profile.displayName}（タイトル画面へ）`}
          aria-current={pathname === "/" ? "page" : undefined}
          className="hover:text-foreground-soft focus-visible:outline-foreground flex min-h-11 items-center text-[19px] font-light tracking-tight outline-offset-2 focus-visible:outline-1"
        >
          {profile.displayName}
        </Link>
        {label && (
          <div
            className={`flex min-w-0 items-center gap-4 ${label.hideOnMobile ? "max-sm:hidden" : ""}`}
          >
            <span aria-hidden className="bg-border h-3.5 w-px shrink-0" />
            <p className="text-muted truncate font-mono text-[11px] tracking-[0.3em] max-sm:tracking-[0.2em]">
              {label.prefix && <span className="max-sm:hidden">{label.prefix} </span>}
              {label.name}
            </p>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <SoundToggle />
        <OptionsMenu />
      </div>
    </header>
  );
}
