import Link from "next/link";
import { categoryLabel } from "@/data/works";
import type { Work } from "@/types/work";

type PrizeInfoProps = {
  work: Work;
  /** 全体の何番目か（0 始まり） */
  index: number;
  total: number;
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 筐体の下に出す、選択中の作品の情報。
 * 選んだ瞬間に切り替わるので、アームの演出を見なくても内容が読める。
 */
export function PrizeInfo({ work, index, total }: PrizeInfoProps) {
  return (
    <section
      aria-labelledby="prize-title"
      className="mx-auto flex w-full max-w-[980px] flex-wrap items-end justify-between gap-8 px-4 sm:px-12"
    >
      <div className="flex flex-[1_1_380px] flex-col gap-2.5">
        <p className="text-muted font-mono text-xs tracking-[0.2em]">
          PRIZE {pad(index + 1)} / {pad(total)} —{" "}
          <span className="font-jp tracking-normal">{categoryLabel[work.category]}</span>
        </p>
        <h2
          id="prize-title"
          className="text-[clamp(40px,6vw,56px)] leading-none font-light tracking-[-0.03em]"
        >
          {work.title}
        </h2>
        <p className="text-foreground-soft font-jp text-base leading-[1.8] font-light">
          {work.tagline}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        {work.tech.length > 0 && (
          <p className="text-foreground-soft font-mono text-xs leading-relaxed">
            {work.tech.join(" · ")}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/collection"
            className="border-border-strong hover:border-foreground focus-visible:outline-foreground inline-flex min-h-12 items-center rounded-full border px-5.5 text-sm outline-offset-2 transition-colors focus-visible:outline-1"
          >
            図鑑で全作品を見る
          </Link>
          <Link
            href={`/collection/${work.slug}`}
            className="bg-foreground text-background-light focus-visible:outline-foreground inline-flex min-h-12 items-center rounded-full px-5.5 text-sm font-medium outline-offset-2 focus-visible:outline-1"
          >
            作品を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
