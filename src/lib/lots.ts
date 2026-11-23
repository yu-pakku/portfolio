import { useSyncExternalStore } from "react";

/**
 * UFOキャッチャーの「ロット」。1列に並べきれない作品は、ロットに分けて
 * 筐体右の SWAP で入れ替える（CLAUDE.md の「作品が増えたとき」）。
 */

/** 1列に並べる数。PC は 6 個、スマホは 3 個 */
export const LOT_SIZE = { wide: 6, narrow: 3 } as const;

/** Tailwind の md（768px）と合わせる */
const WIDE_QUERY = "(min-width: 768px)";

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** 今の画面幅での1ロットの数。画面の回転・リサイズで切り替わる */
export function useLotSize(): number {
  return useSyncExternalStore(
    subscribeWide,
    () => (window.matchMedia(WIDE_QUERY).matches ? LOT_SIZE.wide : LOT_SIZE.narrow),
    // サーバー描画では PC の並びにする（スマホでは hydration 後に 3 個へ切り替わる）
    () => LOT_SIZE.wide,
  );
}

export function lotCount(total: number, lotSize: number): number {
  return Math.max(1, Math.ceil(total / lotSize));
}

/** 全体の何番目（0 始まり）が、何番目のロットに入るか */
export function lotOf(index: number, lotSize: number): number {
  return Math.floor(index / lotSize);
}

/** ロットに入る範囲（全体の番号。end は含まない） */
export function lotRange(lot: number, lotSize: number, total: number) {
  const start = lot * lotSize;
  return { start, end: Math.min(start + lotSize, total) };
}
