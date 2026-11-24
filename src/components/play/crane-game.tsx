"use client";

import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import {
  FlatArm,
  FlatGlassBackdrop,
  FlatGlassReflection,
  FlatStand,
} from "@/components/play/crane-flat";
import { PrizeCard } from "@/components/play/prize-card";
import { PrizeInfo } from "@/components/play/prize-info";
import { PrizeList } from "@/components/play/prize-list";
import { useSound } from "@/components/options/options-provider";
import { lotCount, lotOf, lotRange, useLotSize } from "@/lib/lots";
import { addCollected } from "@/lib/save-data";
import { useCollected } from "@/lib/use-collected";
import type { Work } from "@/types/work";

const pad = (value: number) => String(value).padStart(2, "0");

/** 筐体の黒いパネル（側面が暗く、中央が明るい横方向の陰影） */
const CABINET_BAND =
  "bg-[linear-gradient(90deg,#0b0b0c_0%,#222225_6%,#18181a_50%,#232326_94%,#0a0a0b_100%)]";

/**
 * UFOキャッチャー（/play）。
 * 作品を選んで GRAB を押すと、必ず獲得できる（物理演算は使わない）。
 * 選択・操作はすべて DOM のボタンで行い、作品情報は選んだ時点で下に出す。
 */
export function CraneGame({ works }: { works: readonly Work[] }) {
  const play = useSound();
  const collected = useCollected();
  const lotSize = useLotSize();

  /** 選択中の作品（全体の番号）。ロットはここから決まる */
  const [selected, setSelected] = useState(0);
  /** 獲得して、取り出し口にカードが出ている作品 */
  const [won, setWon] = useState<Work | null>(null);
  /** スクリーンリーダーへのお知らせ */
  const [announcement, setAnnouncement] = useState("");

  const total = works.length;
  const lots = lotCount(total, lotSize);
  const lot = lotOf(selected, lotSize);
  const { start, end } = lotRange(lot, lotSize, total);
  const position = selected - start;
  const work = works[selected];

  const select = useCallback(
    (index: number) => {
      if (index === selected) return;
      play("move");
      setSelected(index);
    },
    [play, selected],
  );

  function move(step: -1 | 1) {
    const next = selected + step;
    if (next < start || next >= end) return;
    select(next);
  }

  function swap() {
    const nextLot = (lot + 1) % lots;
    play("toggle");
    setSelected(lotRange(nextLot, lotSize, total).start);
    setAnnouncement(`景品を入れ替えました。LOT ${pad(nextLot + 1)} / ${pad(lots)}`);
  }

  function grab() {
    // 選んだ景品は必ず取れる。取った景品は台に戻り（補充され）、また取れる。
    // 2D 表示ではアームの演出がないので、すぐに獲得にする（3D の演出は次の PR）
    addCollected(work.slug);
    setWon(work);
    play("get");
    setAnnouncement(`${work.title} を獲得しました。図鑑に登録しました`);
  }

  const closeCard = useCallback(() => {
    play("cancel");
    setWon(null);
  }, [play]);

  if (!work) return null;

  return (
    <div className="flex flex-col gap-12 pb-12 max-md:gap-10">
      <h1 className="sr-only">UFOキャッチャー</h1>

      <section
        aria-label="UFOキャッチャーの筐体"
        className="relative flex justify-center px-4 sm:px-12"
      >
        {/* 床に落ちる影 */}
        <div
          aria-hidden
          className="absolute -bottom-4.5 left-1/2 h-[70px] w-[min(1000px,100%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(30,25,20,0.45)_0%,rgba(30,25,20,0)_70%)]"
        />

        <div className="relative flex w-full max-w-[980px] flex-col drop-shadow-[0_30px_34px_rgba(30,25,20,0.35)]">
          {/* 上部の帯 */}
          <div
            className={`${CABINET_BAND} flex h-13.5 items-center justify-between gap-3 rounded-t-[14px] rounded-b-[2px] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] max-md:h-11 max-md:px-4`}
          >
            <CabinetLabel>
              YUMA<span className="max-sm:hidden"> / PRIZE UNIT — W</span>
            </CabinetLabel>
            <span
              aria-hidden
              className="h-0.5 w-30 rounded-[1px] bg-white shadow-[0_0_10px_#ffffff,0_0_16px_rgba(255,214,150,0.9)] max-sm:w-16"
            />
            <CabinetLabel>
              LOT {pad(lot + 1)} / {pad(lots)}
            </CabinetLabel>
          </div>

          {/* ガラスの中と、右側の STOCK パネル */}
          <div className="flex gap-3 bg-[linear-gradient(90deg,#0b0b0c_0%,#1d1d20_2%,#161618_50%,#1e1e21_98%,#0a0a0b_100%)] px-3 pt-2.5">
            <div className="relative h-[340px] flex-1 overflow-hidden rounded-[2px] bg-[linear-gradient(180deg,#f6f3ee_0%,#e8e3db_45%,#d7d1c7_78%,#c8c1b5_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_20px_40px_rgba(255,255,255,0.6)] max-md:h-[260px]">
              <FlatGlassBackdrop />
              {/* 景品台。列数（--lot）は lots.ts の LOT_SIZE と合わせる */}
              <div className="absolute inset-y-0 right-3.5 left-[150px] [--lot:3] max-md:right-2 max-md:left-16 md:[--lot:6]">
                <FlatStand />
                <FlatArm position={position} />
                <div className="absolute inset-x-0 bottom-5.5 max-md:bottom-4">
                  <PrizeList
                    works={works.slice(start, end)}
                    start={start}
                    selected={selected}
                    collected={collected}
                    onSelect={select}
                  />
                </div>
              </div>
              <FlatGlassReflection />
            </div>

            <div className="flex w-[92px] flex-col items-center justify-center gap-3.5 rounded-[2px] bg-[linear-gradient(180deg,#1f1f22,#141416)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] max-md:hidden">
              <CabinetLabel vertical>STOCK</CabinetLabel>
              <StockGauge lot={lot} lots={lots} />
              <SwapButton disabled={lots < 2} onClick={swap} />
              <CabinetLabel>SWAP</CabinetLabel>
            </div>
          </div>

          {/* 操作盤 */}
          <div className="relative flex h-21 items-center justify-between gap-3 bg-[linear-gradient(180deg,#2a2a2c_0%,#1b1b1d_100%)] px-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] max-md:h-19 max-md:px-3.5">
            {/* ヘアライン仕上げの金属板 */}
            <div
              aria-hidden
              className="absolute inset-x-4 inset-y-2.5 rounded-[3px] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.025)_0px,rgba(255,255,255,0.025)_1px,transparent_1px,transparent_3px),linear-gradient(180deg,#8b8a86,#5c5b58)] opacity-45 max-md:inset-x-2"
            />
            <div
              aria-hidden
              className="relative flex h-9.5 w-35 items-center justify-center rounded-[2px] bg-[#050505] shadow-[inset_0_4px_10px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.08)] max-md:w-16"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#d8d4cc]">
                PRIZE
              </span>
            </div>

            <div className="relative flex items-center gap-4 max-md:gap-2.5">
              <div className="md:hidden">
                <SwapButton disabled={lots < 2} onClick={swap} small />
              </div>
              <ControlButton
                label="左の景品へ"
                disabled={selected <= start}
                onClick={() => move(-1)}
              >
                ←
              </ControlButton>
              <ControlButton
                label="右の景品へ"
                disabled={selected >= end - 1}
                onClick={() => move(1)}
              >
                →
              </ControlButton>
              <button
                type="button"
                aria-label={`GRAB（${work.title} を取る）`}
                onClick={grab}
                className="focus-visible:outline-accent size-16 shrink-0 cursor-pointer rounded-full bg-[radial-gradient(circle_at_40%_32%,#fff6e6_0%,#f3d6a8_38%,#b98f55_100%)] font-sans text-[11px] font-semibold tracking-[0.12em] text-[#2a1d0b] shadow-[0_0_0_4px_#c8c5be,0_0_0_5px_#3a3a3c,0_0_22px_rgba(245,220,180,0.45),0_8px_12px_rgba(0,0,0,0.6)] outline-offset-[7px] focus-visible:outline-2 active:translate-y-px max-md:size-14"
              >
                GRAB
              </button>
            </div>

            {won && <PrizeCard key={won.slug} work={won} onClose={closeCard} />}
          </div>
          <div className={`${CABINET_BAND} h-6.5 rounded-t-[2px] rounded-b-[10px]`} />
        </div>
      </section>

      <PrizeInfo work={work} index={selected} total={total} />

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

function CabinetLabel({
  children,
  vertical,
}: {
  children: ReactNode;
  vertical?: boolean;
}) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.32em] whitespace-nowrap text-[#a8a59e] max-md:text-[9px] max-md:tracking-[0.24em] ${vertical ? "[writing-mode:vertical-rl]" : ""}`}
    >
      {children}
    </span>
  );
}

/** 残りのロットを示す目盛り。今のロットだけ明るくする */
function StockGauge({ lot, lots }: { lot: number; lots: number }) {
  return (
    <div aria-hidden className="flex flex-col gap-1">
      {Array.from({ length: Math.max(lots, 3) }, (_, index) => (
        <span
          key={index}
          className={`h-1.5 w-10 ${index === lot ? "bg-[#d8d4cc]" : index < lots ? "bg-[#5a5a5e]" : "bg-[#2e2e31]"}`}
        />
      ))}
    </div>
  );
}

/** 筐体の丸い金属ボタン（← → SWAP） */
const METAL_BUTTON =
  "grid shrink-0 cursor-pointer place-items-center rounded-full bg-[radial-gradient(circle_at_40%_32%,#ffffff,#e4e1da_60%,#bcb9b2)] text-[#3a3833] shadow-[0_0_0_2px_#3a3a3d,0_0_0_3px_#0a0a0b,0_6px_10px_rgba(0,0,0,0.5)] outline-offset-[6px] focus-visible:outline-2 focus-visible:outline-[#f3f1ec] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40";

function ControlButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`${METAL_BUTTON} size-11.5 text-sm max-md:size-11`}
    >
      {children}
    </button>
  );
}

function SwapButton({
  disabled,
  onClick,
  small,
}: {
  disabled: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label="SWAP（景品を次のロットに入れ替える）"
      disabled={disabled}
      onClick={onClick}
      className={`${METAL_BUTTON} ${small ? "size-11" : "size-13"}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </button>
  );
}
