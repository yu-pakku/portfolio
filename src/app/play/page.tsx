import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/page-transition";
import { CraneGame } from "@/components/play/crane-game";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "はじめる",
};

/** UFOキャッチャー。作品を選んで GRAB で獲得する（G-Crane）。 */
export default function PlayPage() {
  return (
    <PageTransition>
      <main className="flex flex-1 flex-col pt-4 sm:pt-6">
        <CraneGame works={works} />
      </main>
    </PageTransition>
  );
}
