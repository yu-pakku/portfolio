import type { Metadata } from "next";
import Link from "next/link";
import { Screen } from "@/components/game/screen";

export const metadata: Metadata = {
  title: "はじめる",
};

/** UFOキャッチャー。本体は Phase 3 で実装する。 */
export default function PlayPage() {
  return (
    <Screen label="PLAY" title="UFOキャッチャー">
      <div className="border-border flex flex-col items-start gap-4 rounded-lg border border-dashed p-8">
        <p>UFOキャッチャーは準備中です。</p>
        <Link href="/collection" className="text-accent underline underline-offset-4">
          コレクション図鑑で作品を見る
        </Link>
      </div>
    </Screen>
  );
}
