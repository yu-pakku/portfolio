import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GAME OVER",
};

/** 存在しないページ。CONTINUE でタイトル画面へ戻る。 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-muted font-mono text-sm">404</p>
      <h1 className="font-mono text-5xl font-black tracking-widest">GAME OVER</h1>
      <p className="text-muted">このページは見つかりませんでした。</p>
      <Link
        href="/"
        className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-lg border px-5 py-2 font-mono transition-colors"
      >
        CONTINUE?
      </Link>
    </main>
  );
}
