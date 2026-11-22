import type { Metadata } from "next";
import { Screen } from "@/components/game/screen";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "クレジット",
};

const contacts = [
  { label: "GitHub", href: profile.links.github },
  { label: "X", href: profile.links.x },
] as const;

/** スタッフロールと連絡先。エンドロール演出は Phase 3 で実装する。 */
export default function CreditsPage() {
  return (
    <Screen label="CREDITS" title="スタッフロール">
      <dl className="grid gap-2 sm:grid-cols-[10rem_1fr]">
        <dt className="text-muted">企画・設計・開発</dt>
        <dd>{profile.displayName}</dd>
      </dl>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">連絡先</h2>
        <ul className="flex flex-wrap gap-3">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border hover:border-foreground hover:text-foreground inline-block rounded-lg border px-4 py-2 transition-colors"
              >
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Screen>
  );
}
