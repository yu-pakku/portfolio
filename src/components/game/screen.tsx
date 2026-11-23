import type { ReactNode } from "react";
import { PageTransition } from "@/components/layout/page-transition";

type ScreenProps = {
  /** 画面上部に出すゲーム風の見出し（例：COLLECTION） */
  label: string;
  title: string;
  children: ReactNode;
};

/**
 * 各モード画面の共通の枠。
 * タイトル画面へ戻るリンクは共通ヘッダー（左の yuma）が持つ。
 */
export function Screen({ label, title, children }: ScreenProps) {
  return (
    <PageTransition>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 pt-6 pb-12">
        <header className="flex flex-col gap-2">
          <p className="text-foreground font-mono text-sm tracking-[0.3em]">{label}</p>
          <h1 className="text-3xl font-bold">{title}</h1>
        </header>
        {children}
      </main>
    </PageTransition>
  );
}
