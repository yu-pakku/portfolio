import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * ページの中身を、遷移のときにふわっと入れ替える（React の <ViewTransition>）。
 * レイアウトはページを移動しても残るため enter / exit が起きない。各ページの中で包む。
 * アニメーションの中身は globals.css の .page-enter / .page-exit。
 * 演出オフ・OS の「視差効果を減らす」では CSS 側で止める。
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
