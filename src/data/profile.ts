/** サイトに表示する本人情報。本名・学校名は載せない方針。 */
export const profile = {
  displayName: "yuma",
  handle: "yu-pakku",
  motto: "「誰のどんな課題を解決するか」から考える開発",
  goal: "フルスタックエンジニア",
  now: "1週間で1つのアプリを自力で作り、理解まで進めるチャレンジ",
  interest: "情報技術の恩恵を受けにくい人を支える仕組みづくり",
  links: {
    github: "https://github.com/yu-pakku",
    x: "https://x.com/yumakano0506",
  },
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
