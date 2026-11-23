"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainMenu } from "@/data/menu";

/**
 * タイトル画面のメインメニュー。
 * ゲームのメニューと同じく、カーソル（選択中の項目）を常に1つ持つ。
 * - ↑↓ キーで項目を移動、Enter で決定（リンクの通常動作）
 * - どこにもフォーカスがない状態で Enter を押すと Play を始める
 */
export function MainMenu() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;

      const links = linkRefs.current;
      const focusedIndex = links.findIndex((link) => link === document.activeElement);
      const nothingFocused =
        document.activeElement === null || document.activeElement === document.body;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        // メニュー外（入力欄など）にフォーカスがあるときは邪魔しない
        if (focusedIndex === -1 && !nothingFocused) return;
        event.preventDefault();
        const step = event.key === "ArrowDown" ? 1 : -1;
        const from = focusedIndex === -1 ? activeIndex - step : focusedIndex;
        const next = (from + step + links.length) % links.length;
        links[next]?.focus();
        return;
      }

      if (event.key === "Enter" && nothingFocused) {
        event.preventDefault();
        router.push(mainMenu[activeIndex].href);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, router]);

  return (
    <nav aria-label="メインメニュー" className="w-full max-w-[440px]">
      <ul className="border-border border-t">
        {mainMenu.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.href} className="border-border border-b">
              <Link
                ref={(element) => {
                  linkRefs.current[index] = element;
                }}
                href={item.href}
                data-active={isActive || undefined}
                onPointerEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="group focus-visible:outline-foreground grid min-h-[60px] grid-cols-[48px_1fr_auto] items-center gap-x-2 outline-offset-4 focus-visible:outline-1"
              >
                <span className="text-muted group-data-active:text-foreground font-mono text-xs transition-colors">
                  {item.number}
                </span>
                <span className="text-xl font-light tracking-[-0.01em] group-data-active:font-normal">
                  {item.label}
                </span>
                <span className="text-muted group-data-active:text-foreground-soft font-jp text-[13px] transition-colors">
                  {item.description}
                  <span
                    aria-hidden
                    className="inline-block w-[1.5em] text-right opacity-0 transition-[opacity,transform] group-data-active:translate-x-0.5 group-data-active:opacity-100"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
