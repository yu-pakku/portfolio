/**
 * スキル一覧。GitHub プロフィール README の Tech Stack と内容を揃える。
 * mastered: 習得済み / learning: 学習中
 */
export type SkillLevel = "mastered" | "learning";

export type SkillGroup = {
  label: string;
  skills: readonly { name: string; level: SkillLevel }[];
};

const m = (name: string) => ({ name, level: "mastered" as const });
const l = (name: string) => ({ name, level: "learning" as const });

export const skillGroups: readonly SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      m("HTML"),
      m("CSS"),
      l("JavaScript"),
      l("TypeScript"),
      l("React"),
      l("Next.js"),
      l("Tailwind CSS"),
      l("Zustand"),
      l("Vite"),
    ],
  },
  {
    label: "Backend",
    skills: [
      m("PHP"),
      m("Laravel"),
      m("Django"),
      l("Node.js"),
      l("Python"),
      l("Java"),
      l("C"),
      l("FastAPI"),
      l("WordPress"),
    ],
  },
  {
    label: "Database",
    skills: [
      l("MySQL"),
      l("PostgreSQL"),
      l("Supabase"),
      l("Firebase"),
      l("Prisma"),
      l("SQLite"),
      l("Drizzle ORM"),
    ],
  },
  {
    label: "DevOps",
    skills: [m("Git"), m("GitHub"), m("Docker"), m("Vercel"), l("Bash")],
  },
  {
    label: "Tools",
    skills: [
      m("VS Code"),
      m("Cursor"),
      m("Postman"),
      m("MAMP"),
      m("Sourcetree"),
      m("Notion"),
      m("Claude"),
      m("ChatGPT"),
      l("npm"),
    ],
  },
  {
    label: "Design",
    skills: [m("Figma"), m("draw.io"), m("Canva"), l("Illustrator"), l("Photoshop")],
  },
];

export const levelLabel = {
  mastered: "習得済み",
  learning: "学習中",
} as const satisfies Record<SkillLevel, string>;
