import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Screen } from "@/components/game/screen";
import { categoryLabel, findWork, works } from "@/data/works";
import type { WorkDetail } from "@/types/work";

/** generateStaticParams にない slug は 404 にする */
export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata(
  props: PageProps<"/collection/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const work = findWork(slug);
  if (!work) return {};
  return { title: work.title, description: work.tagline };
}

const detailSections = [
  { key: "problem", heading: "課題" },
  { key: "solution", heading: "解決策" },
  { key: "role", heading: "役割" },
  { key: "highlights", heading: "工夫・苦労した点" },
  { key: "learnings", heading: "学びと次の改善" },
] as const satisfies readonly { key: keyof WorkDetail; heading: string }[];

export default async function WorkDetailPage(props: PageProps<"/collection/[slug]">) {
  const { slug } = await props.params;
  const work = findWork(slug);
  if (!work) notFound();

  return (
    <Screen label={categoryLabel[work.category]} title={work.title}>
      <div className="flex flex-col gap-8">
        <Image
          src={work.image.src}
          alt={work.image.alt}
          width={1280}
          height={720}
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="border-border aspect-video w-full rounded-lg border object-cover"
          preload
        />

        <div className="flex flex-col gap-2">
          <p className="text-lg">{work.tagline}</p>
          {work.context && <p className="text-muted text-sm">{work.context}</p>}
        </div>

        {work.tech.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="font-bold">使用技術</h2>
            <ul className="flex flex-wrap gap-2">
              {work.tech.map((name) => (
                <li
                  key={name}
                  className="border-border text-muted rounded-full border px-3 py-1 text-sm"
                >
                  {name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {detailSections.map(({ key, heading }) => (
          <section key={key} className="flex flex-col gap-2">
            <h2 className="font-bold">{heading}</h2>
            <p className={work.detail[key] ? "" : "text-muted"}>
              {work.detail[key] ?? "準備中"}
            </p>
          </section>
        ))}

        {work.repositoryUrl && (
          <a
            href={work.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background w-fit rounded-lg border px-4 py-2 transition-colors"
          >
            GitHub でリポジトリを見る
          </a>
        )}
      </div>
    </Screen>
  );
}
