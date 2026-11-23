import { useSyncExternalStore } from "react";
import { defaultSaveData, getSaveData, subscribeSaveData } from "@/lib/save-data";

/** 獲得した作品の slug 一覧（セーブデータ）。サーバー描画と hydration の間は空 */
export function useCollected(): readonly string[] {
  return useSyncExternalStore(
    subscribeSaveData,
    () => getSaveData().collected,
    () => defaultSaveData.collected,
  );
}
