/** タイトル画面のメインメニュー。サイトの目次を兼ねる。 */
export const mainMenu = [
  { number: "01", href: "/play", label: "Play", description: "UFOキャッチャー" },
  { number: "02", href: "/collection", label: "Collection", description: "全作品の図鑑" },
  { number: "03", href: "/character", label: "Profile", description: "自己紹介・スキル" },
  { number: "04", href: "/credits", label: "Credits", description: "連絡先" },
] as const;
