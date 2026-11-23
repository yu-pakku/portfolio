/** 筐体の側面が暗く、中央が明るい横方向の陰影（マットブラック） */
const cabinetShade =
  "linear-gradient(90deg, #0b0b0c, #1f1f22 6%, #161618 50%, #202023 94%, #0a0a0b)";

const prizeTilts = ["-2deg", "1deg", "-1deg", "2deg", "-2deg", "1deg"] as const;

/**
 * タイトル画面に置く UFOキャッチャー筐体の静止イラスト（装飾）。
 * 本物の 3D 筐体は /play で描画する。ここは CSS だけで軽く描く。
 */
export function TitleCabinet() {
  return (
    <div
      aria-hidden
      className="relative flex min-h-[360px] w-full items-center justify-center md:min-h-[520px]"
    >
      {/* 床に落ちる影 */}
      <div className="absolute bottom-[8%] h-11 w-[min(520px,100%)] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(30,25,20,0.45),rgba(30,25,20,0)_70%)]" />

      <div className="relative flex w-[min(460px,100%)] flex-col drop-shadow-[0_26px_30px_rgba(30,25,20,0.35)]">
        {/* 天板と照明 */}
        <div
          className="flex h-[30px] items-center justify-center rounded-t-[10px] rounded-b-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
          style={{ background: cabinetShade }}
        >
          <span className="h-0.5 w-[70px] bg-white shadow-[0_0_10px_rgba(255,214,150,0.9)]" />
        </div>

        {/* ガラス越しの内部 */}
        <div className="px-2 pt-1.5" style={{ background: cabinetShade }}>
          <div className="relative h-[170px] overflow-hidden bg-[linear-gradient(180deg,#f6f3ee,#e3ded5_55%,#c9c2b6)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-white shadow-[0_0_14px_6px_rgba(255,248,236,0.9)]" />

            {/* アーム */}
            <div className="motion-safe:animate-arm-sway absolute top-2.5 left-[33%] flex flex-col items-center">
              <div className="h-11 w-0.5 bg-[#a9a6a0]" />
              <div className="h-[15px] w-[22px] rounded-t-[4px] rounded-b-[8px] bg-[linear-gradient(90deg,#9a978f,#ffffff_40%,#86837c)]" />
            </div>

            {/* 景品（白い化粧箱） */}
            <div className="absolute right-3 bottom-3 left-[15%] grid grid-cols-6 items-end gap-2">
              {prizeTilts.map((tilt, index) => (
                <div
                  key={index}
                  className="h-11 bg-[linear-gradient(90deg,#e7e5e0,#ffffff_40%,#efeee9)] shadow-[3px_8px_10px_rgba(60,50,40,0.25)]"
                  style={{ transform: `rotate(${tilt})` }}
                />
              ))}
            </div>

            {/* ガラスの映り込み */}
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0)_15%,rgba(255,255,255,0.35)_19%,rgba(255,255,255,0)_28%)]" />
          </div>
        </div>

        {/* 操作パネル（GRAB ボタンだけ差し色） */}
        <div className="flex h-11 items-center justify-end gap-2.5 bg-[linear-gradient(180deg,#2a2a2c,#1b1b1d)] px-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
          <span className="size-5 rounded-full bg-[radial-gradient(circle_at_40%_32%,#ffffff,#bcb9b2)] shadow-[0_0_0_2px_#ffffff]" />
          <span className="size-7 rounded-full bg-[radial-gradient(circle_at_40%_32%,#fff6e6,var(--accent)_38%,var(--accent-deep))] shadow-[0_0_0_2px_#c8c5be,0_0_12px_rgba(245,220,180,0.45)]" />
        </div>

        {/* 下部と取り出し口 */}
        <div
          className="flex h-[150px] items-start rounded-t-[2px] rounded-b-[8px] px-[22px] py-4"
          style={{ background: cabinetShade }}
        >
          <span className="h-[22px] w-20 bg-[#050505] shadow-[inset_0_3px_8px_#000000]" />
        </div>
      </div>
    </div>
  );
}
