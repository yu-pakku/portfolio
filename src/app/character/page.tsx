import type { Metadata } from "next";
import { Screen } from "@/components/game/screen";
import { profile } from "@/data/profile";
import { levelLabel, skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "キャラクター",
};

/** キャラクター画面（自己紹介・スキル）。歩み（セーブデータ）は後日追加する。 */
export default function CharacterPage() {
  return (
    <Screen label="CHARACTER" title={profile.displayName}>
      <dl className="grid gap-4 sm:grid-cols-[8rem_1fr]">
        <dt className="text-muted">大事にしていること</dt>
        <dd>{profile.motto}</dd>
        <dt className="text-muted">目標</dt>
        <dd>{profile.goal}</dd>
        <dt className="text-muted">いま</dt>
        <dd>{profile.now}</dd>
        <dt className="text-muted">関心</dt>
        <dd>{profile.interest}</dd>
      </dl>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">スキル</h2>
        {skillGroups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <h3 className="text-foreground font-mono text-sm">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={
                    skill.level === "mastered"
                      ? "border-foreground rounded-full border px-3 py-1 text-sm"
                      : "border-border text-muted rounded-full border px-3 py-1 text-sm"
                  }
                >
                  {skill.name}
                  <span className="sr-only">（{levelLabel[skill.level]}）</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-muted text-sm">
          枠が明るいものは{levelLabel.mastered}、暗いものは{levelLabel.learning}です。
        </p>
      </section>
    </Screen>
  );
}
