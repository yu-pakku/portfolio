/**
 * ガラスの中の 2D 表示（G-Crane のデザインを CSS で組んだもの）。
 * 3D が使えないとき・演出オフのとき、また 3D の読み込み中に表示する。
 * 景品のボタンはこの上に DOM で重ねる（prize-list.tsx）。
 */

/** ガラスの中の照明・レール・取り出し口・景品台。すべて飾りなので読み上げない */
export function FlatGlassBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* 天井の照明 */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-white shadow-[0_0_20px_8px_rgba(255,248,236,0.9)]" />
      {/* アームのレール */}
      <div className="absolute inset-x-6 top-5 h-1 bg-[linear-gradient(180deg,#ffffff,#a9a6a0)] max-md:inset-x-3" />
      {/* 取り出し口（透明な囲いと、落とし口） */}
      <div className="absolute bottom-0 left-3.5 h-30 w-[118px] border border-b-0 border-white/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.2))] max-md:left-2 max-md:h-20 max-md:w-12">
        <div className="absolute inset-x-2 bottom-0 h-6 bg-[#3a3631] shadow-[inset_0_6px_10px_rgba(0,0,0,0.6)] max-md:inset-x-1 max-md:h-4" />
      </div>
    </div>
  );
}

/** 景品台（取り出し口の右から奥まで続く台） */
export function FlatStand() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-13.5 bg-[linear-gradient(180deg,#cfc8bc,#bdb5a8)] max-md:h-10"
    />
  );
}

/** ガラス面の映り込み。いちばん手前に重ねる */
export function FlatGlassReflection() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_16%,rgba(255,255,255,0.35)_19%,rgba(255,255,255,0.08)_26%,rgba(255,255,255,0)_30%,rgba(255,255,255,0)_72%,rgba(255,255,255,0.22)_75%,rgba(255,255,255,0)_80%)]"
    />
  );
}

/**
 * アーム。選択中の景品の真上に来る。
 * 位置は景品台の列数（CSS 変数 --lot）から計算するので、測らなくてもずれない。
 */
export function FlatArm({ position }: { position: number }) {
  return (
    <div
      aria-hidden
      style={{ left: `calc(${position + 0.5} * 100% / var(--lot))` }}
      className="effects-on:transition-[left] effects-on:duration-500 pointer-events-none absolute top-[18px] flex w-[90px] -translate-x-1/2 flex-col items-center ease-[cubic-bezier(0.4,0,0.2,1)] max-md:top-3 max-md:origin-top max-md:scale-75"
    >
      <div className="h-3 w-[46px] rounded-[2px] bg-[linear-gradient(180deg,#ffffff,#b8b5ae_60%,#8d8a84)]" />
      <div className="h-[70px] w-0.5 bg-[linear-gradient(90deg,#8d8a84,#ffffff,#8d8a84)] max-md:h-12" />
      <div className="h-[26px] w-[34px] rounded-[6px_6px_12px_12px] bg-[linear-gradient(90deg,#9a978f_0%,#ffffff_38%,#c9c6bf_60%,#86837c_100%)] shadow-[0_8px_12px_rgba(60,50,40,0.25)]" />
      <div className="relative -mt-1 h-[54px] w-[90px]">
        <div className="absolute top-0 left-[22px] h-[50px] w-[5px] origin-top rotate-[20deg] rounded-[3px] bg-[linear-gradient(90deg,#86837c,#ffffff_50%,#9a978f)]" />
        <div className="absolute top-0 left-[43px] h-[46px] w-[5px] rounded-[3px] bg-[linear-gradient(90deg,#86837c,#ffffff_50%,#9a978f)] opacity-70" />
        <div className="absolute top-0 right-[22px] h-[50px] w-[5px] origin-top -rotate-[20deg] rounded-[3px] bg-[linear-gradient(90deg,#86837c,#ffffff_50%,#9a978f)]" />
      </div>
    </div>
  );
}
