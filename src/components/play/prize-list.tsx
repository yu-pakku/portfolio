"use client";

import Image from "next/image";
import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { prizeLabel, textureSrc } from "@/data/works";
import type { Work } from "@/types/work";

/** 箱を少しずつ傾けて、手で並べたように見せる */
const TILTS = ["-2deg", "1deg", "-1deg", "2deg", "-2deg", "1deg"];

type PrizeListProps = {
  /** 今のロットに並ぶ作品 */
  works: readonly Work[];
  /** 全体の何番目からがこのロットか（0 始まり） */
  start: number;
  /** 選択中の作品（全体の番号） */
  selected: number;
  collected: readonly string[];
  onSelect: (index: number) => void;
};

/**
 * 景品台に並ぶ作品の箱。選択は常にこの DOM のボタンで行う（キーボード・スクリーンリーダー対応）。
 * ← → で選択を動かし、Tab では選択中の1個にだけ止まる。
 */
export function PrizeList({
  works,
  start,
  selected,
  collected,
  onSelect,
}: PrizeListProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function moveFocus(event: KeyboardEvent, position: number) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : undefined;
    if (step === undefined) return;
    event.preventDefault();
    const next = position + step;
    if (next < 0 || next >= works.length) return;
    onSelect(start + next);
    buttons.current[next]?.focus();
  }

  return (
    <ul
      aria-label="景品"
      className="grid grid-cols-3 items-end gap-3 md:grid-cols-6 md:gap-3.5"
    >
      {works.map((work, position) => {
        const index = start + position;
        const isSelected = index === selected;
        const isCollected = collected.includes(work.slug);
        return (
          <li key={work.slug} className="flex justify-center">
            <button
              ref={(element) => {
                buttons.current[position] = element;
              }}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${work.title}${isCollected ? "（獲得済み）" : ""}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(event) => moveFocus(event, position)}
              style={{ rotate: TILTS[position % TILTS.length] }}
              className="focus-visible:outline-foreground aria-pressed:ring-foreground w-full max-w-26 cursor-pointer rounded-[1px] bg-[linear-gradient(90deg,#e7e5e0,#ffffff_40%,#efeee9)] px-1.5 pt-1.5 pb-2 text-left shadow-[5px_12px_16px_rgba(60,50,40,0.28),inset_0_1px_0_#ffffff] outline-offset-4 focus-visible:outline-1 aria-pressed:ring-2"
            >
              <span className="relative block overflow-hidden">
                <Image
                  src={textureSrc(work)}
                  alt=""
                  width={512}
                  height={384}
                  sizes="104px"
                  className="block aspect-[4/3] w-full object-cover"
                />
                {/* 箱の窓のフィルムに映る光 */}
                <span className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_40%)]" />
              </span>
              <span className="mt-1.5 flex items-center justify-between gap-1">
                <span className="text-foreground truncate font-sans text-[8px] tracking-[0.1em]">
                  {prizeLabel(work)}
                </span>
                {/* 獲得済みの印。白い箱を崩さないよう、刻印のような小さな線だけにする */}
                {isCollected && (
                  <svg
                    aria-hidden
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    className="text-muted shrink-0"
                  >
                    <path
                      d="M1.2 4.2 3.2 6.1 6.8 1.9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
