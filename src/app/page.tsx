import { MainMenu } from "@/components/title/main-menu";
import { TitleCabinet } from "@/components/title/title-cabinet";
import { profile } from "@/data/profile";

/**
 * タイトル画面（G-Title）。メインメニューがサイトの目次を兼ねる。
 * 名前・一言・メニューは最初から DOM にあり、起動演出は短いフェードだけ。
 */
export default function TitlePage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[radial-gradient(ellipse_45%_70%_at_72%_42%,var(--background-light)_0%,var(--background)_55%,var(--background-deep)_100%)] max-md:bg-[radial-gradient(ellipse_90%_50%_at_50%_70%,var(--background-light)_0%,var(--background)_60%,var(--background-deep)_100%)]">
      <header className="flex items-center justify-between px-4 py-7 sm:px-12">
        <p className="text-muted font-mono text-[11px] tracking-[0.3em]">
          PORTFOLIO — 2026
        </p>
      </header>

      <div className="flex flex-1 flex-wrap items-center gap-10 px-4 pb-10 sm:px-12">
        <main className="flex flex-[1_1_440px] flex-col gap-11">
          <div className="animate-boot flex flex-col gap-4.5">
            <h1 className="text-[clamp(96px,14vw,168px)] leading-[0.9] font-extralight tracking-tighter">
              {profile.displayName}
            </h1>
            <p className="text-foreground-soft font-jp text-[17px] leading-[1.8] font-light">
              {profile.motto}
            </p>
          </div>

          <div className="animate-boot [animation-delay:120ms]">
            <MainMenu />
          </div>

          <p className="text-muted animate-boot font-mono text-[11px] tracking-[0.3em] [animation-delay:240ms] pointer-coarse:hidden">
            <span className="motion-safe:animate-blink">PRESS ENTER TO START</span>
          </p>
        </main>

        <div className="animate-boot flex flex-[1_1_400px] justify-center [animation-delay:180ms]">
          <TitleCabinet />
        </div>
      </div>
    </div>
  );
}
