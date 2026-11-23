"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { textureSrc } from "@/data/works";
import type { Work } from "@/types/work";

type PrizeCardProps = {
  work: Work;
  onClose: () => void;
};

/**
 * 獲得した作品のカード。取り出し口（操作盤の PRIZE 口）から出てくる。
 * 画面を塞がないよう、モーダルにはしない。Esc か「閉じる」で消える。
 */
export function PrizeCard({ work, onClose }: PrizeCardProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="group"
      aria-labelledby="prize-card-title"
      className="effects-on:animate-prize-out border-border bg-background-light absolute bottom-[calc(100%+12px)] left-4 z-10 flex w-[min(300px,calc(100%-32px))] flex-col gap-3 rounded-xl border p-3 shadow-[0_18px_40px_rgba(30,25,20,0.28)] sm:left-9"
    >
      <div className="flex gap-3">
        <Image
          src={textureSrc(work)}
          alt=""
          width={512}
          height={384}
          sizes="96px"
          className="aspect-[4/3] w-24 shrink-0 rounded-[2px] object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-muted font-mono text-[10px] tracking-[0.3em]">GET!</p>
          <p id="prize-card-title" className="truncate text-lg font-light tracking-tight">
            {work.title}
          </p>
          <p className="text-muted font-jp text-xs">図鑑に登録しました</p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="border-border-strong hover:border-foreground focus-visible:outline-foreground min-h-11 rounded-full border px-4 text-[13px] outline-offset-2 transition-colors focus-visible:outline-1"
        >
          閉じる
        </button>
        <Link
          href={`/collection/${work.slug}`}
          className="bg-foreground text-background-light focus-visible:outline-foreground inline-flex min-h-11 items-center rounded-full px-4 text-[13px] outline-offset-2 focus-visible:outline-1"
        >
          作品を見る →
        </Link>
      </div>
    </div>
  );
}
