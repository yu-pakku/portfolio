import Link from "next/link";
import type { ReactNode } from "react";

type ScreenProps = {
  /** 画面上部に出すゲーム風の見出し（例：COLLECTION） */
  label: string;
  title: string;
  children: ReactNode;
  /** タイトル画面以外では「メニューへ戻る」を出す */
  showBackToMenu?: boolean;
};

/** 各モード画面の共通の枠。 */
export function Screen({ label, title, children, showBackToMenu = true }: ScreenProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2">
        {showBackToMenu && (
          <Link
            href="/"
            className="text-muted hover:text-accent focus-visible:text-accent w-fit font-mono text-sm transition-colors"
          >
            ◀ メニューへ戻る
          </Link>
        )}
        <p className="text-accent font-mono text-sm tracking-[0.3em]">{label}</p>
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>
      {children}
    </main>
  );
}
