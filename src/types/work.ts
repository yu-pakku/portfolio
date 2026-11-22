/** 作品の区分。個人制作かチーム制作か。 */
export type WorkCategory = "personal" | "team";

/** 作品詳細ページの各項目。未記入の項目は「準備中」と表示する。 */
export type WorkDetail = {
  /** 誰のどんな困りごとを解決するか */
  problem?: string;
  /** 何を作ったか */
  solution?: string;
  /** チーム人数と自分の担当 */
  role?: string;
  /** 工夫・苦労した点 */
  highlights?: string;
  /** 学びと次の改善 */
  learnings?: string;
};

export type Work = {
  /** URL に使う識別子（/collection/[slug]） */
  slug: string;
  title: string;
  category: WorkCategory;
  /** 一言での説明 */
  tagline: string;
  /** 制作の場（例：企業連携イベント）。企業名は書かない */
  context?: string;
  image: {
    src: string;
    alt: string;
    /** 実際の画面ではなく仮画像の場合は true */
    isPlaceholder: boolean;
  };
  /** 使用技術（リポジトリから確認できたもの） */
  tech: readonly string[];
  /** 公開リポジトリの URL。非公開の場合は持たない */
  repositoryUrl?: string;
  detail: WorkDetail;
};
