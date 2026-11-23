import type { Work } from "@/types/work";

/**
 * 掲載する作品の一覧。
 * 作品を追加するときは、この配列に1件追加し、画像を public/works/ に置いて
 * `npm run textures` を実行する（手順は CLAUDE.md の「作品の追加手順」）。
 * detail の各項目は本人が内容を確認してから記入する（推測で埋めない）。
 */
export const works = [
  {
    slug: "yuma-app",
    title: "yuma-app",
    category: "personal",
    tagline:
      "1週間で1つのWebアプリを自力で作り、コードを理解するまで進める開発チャレンジ",
    image: {
      src: "/works/yuma-app.png",
      alt: "yuma-app のカバー画像",
      isPlaceholder: false,
    },
    tech: ["Next.js", "React", "TypeScript", "Zustand", "Tailwind CSS", "Laravel", "PHP"],
    repositoryUrl: "https://github.com/yu-pakku/yuma-app",
    detail: {},
  },
  {
    slug: "reboost",
    title: "ReBoost",
    category: "personal",
    tagline: "想起と反復で知識を育てる記憶定着アプリ",
    image: {
      src: "/works/reboost.png",
      alt: "ReBoost のカバー画像",
      isPlaceholder: false,
    },
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Dexie（IndexedDB）",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    repositoryUrl: "https://github.com/yu-pakku/reboost",
    detail: {},
  },
  {
    slug: "student-data-bank",
    title: "学生データバンク",
    category: "personal",
    tagline: "学生の情報を登録・検索・編集できる学生名簿管理アプリ",
    image: {
      src: "/works/student-data-bank.png",
      alt: "学生データバンクの仮画像",
      isPlaceholder: true,
    },
    tech: ["Laravel", "PHP", "MySQL", "Docker"],
    repositoryUrl: "https://github.com/yu-pakku/laravel-student-app",
    detail: {},
  },
  {
    slug: "board-game",
    title: "ボードゲーム",
    category: "personal",
    tagline: "説明は準備中です",
    image: {
      src: "/works/board-game.png",
      alt: "ボードゲームの仮画像",
      isPlaceholder: true,
    },
    tech: [],
    detail: {},
  },
  {
    slug: "snapspot",
    title: "SnapSpot",
    category: "team",
    tagline: "写真を入口に、リアルな街歩きにつなげるアプリ",
    image: {
      src: "/works/snapspot.png",
      alt: "SnapSpot のカバー画像",
      isPlaceholder: false,
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Laravel"],
    repositoryUrl: "https://github.com/yu-pakku/SnapSpot",
    detail: {},
  },
  {
    slug: "muddy",
    title: "Muddy",
    category: "team",
    tagline: "毎日のケアを積み重ねる育成型習慣アプリ",
    context: "企業連携イベントでのチーム制作",
    image: {
      src: "/works/muddy.png",
      alt: "Muddy のカバー画像",
      isPlaceholder: false,
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "SWR", "Zod"],
    repositoryUrl: "https://github.com/WeatherNewsApp/weather-web-frontend",
    detail: {},
  },
] as const satisfies readonly Work[];

export type WorkSlug = (typeof works)[number]["slug"];

export function findWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

/**
 * UFOキャッチャーの景品（箱の窓）に貼る縮小版の画像。
 * `npm run textures` が public/works/ の画像から public/works/textures/ に書き出す。
 */
export function textureSrc(work: Work): string {
  const fileName = work.image.src.split("/").pop() ?? work.slug;
  return `/works/textures/${fileName.replace(/\.[^.]+$/, "")}.webp`;
}

export const categoryLabel = {
  personal: "個人制作",
  team: "チーム制作",
} as const satisfies Record<Work["category"], string>;
