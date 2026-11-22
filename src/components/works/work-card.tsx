import Image from "next/image";
import Link from "next/link";
import { categoryLabel } from "@/data/works";
import type { Work } from "@/types/work";

/** 図鑑に並べる作品カード。 */
export function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/collection/${work.slug}`}
      className="group border-border bg-surface hover:border-foreground focus-visible:border-foreground flex flex-col overflow-hidden rounded-lg border transition-colors"
    >
      <Image
        src={work.image.src}
        alt={work.image.alt}
        width={1280}
        height={720}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-col gap-1 p-4">
        <p className="text-muted text-xs">{categoryLabel[work.category]}</p>
        <h2 className="group-hover:text-foreground font-bold">{work.title}</h2>
        <p className="text-muted text-sm">{work.tagline}</p>
      </div>
    </Link>
  );
}
