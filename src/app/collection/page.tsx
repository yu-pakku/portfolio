import type { Metadata } from "next";
import { Screen } from "@/components/game/screen";
import { WorkCard } from "@/components/works/work-card";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "コレクション",
};

/**
 * コレクション図鑑。UFOキャッチャーを遊ばなくても全作品を見られる近道を兼ねる。
 * 獲得済み／未獲得の表示切替は Phase 3 で実装する。
 */
export default function CollectionPage() {
  return (
    <Screen label="COLLECTION" title="コレクション図鑑">
      <p className="text-muted">全{works.length}作品</p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <li key={work.slug}>
            <WorkCard work={work} />
          </li>
        ))}
      </ul>
    </Screen>
  );
}
