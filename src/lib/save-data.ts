/**
 * ブラウザ内に保存する「セーブデータ」。
 * localStorage が使えない環境（プライベートモード・ブロック設定など）でも
 * 壊れないよう、読み書きはすべて try/catch で囲み、失敗したらメモリ上だけで持つ。
 */

export type Options = {
  /** 効果音。初期状態はミュート */
  sound: boolean;
  /** 演出（アニメーション・ページ遷移）。false で止める */
  effects: boolean;
};

export type SaveData = {
  version: 2;
  options: Options;
  /** UFOキャッチャーで獲得した作品の slug（獲得した順） */
  collected: readonly string[];
};

export const SAVE_KEY = "yuma-portfolio:save";

export const defaultSaveData: SaveData = {
  version: 2,
  options: { sound: false, effects: true },
  collected: [],
};

/**
 * 最初の描画の前に「演出オフ」を <html> に反映するインラインスクリプト。
 * React の読み込みを待つと、一瞬だけアニメーションが動いてしまうため。
 */
export const effectsBootScript = `try{var d=JSON.parse(localStorage.getItem(${JSON.stringify(SAVE_KEY)})||"null");if(d&&d.options&&d.options.effects===false)document.documentElement.dataset.effects="off"}catch(e){}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseOptions(value: unknown): Options {
  const options = isRecord(value) ? value : {};
  return {
    sound:
      typeof options.sound === "boolean" ? options.sound : defaultSaveData.options.sound,
    effects:
      typeof options.effects === "boolean"
        ? options.effects
        : defaultSaveData.options.effects,
  };
}

function parseCollected(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((slug): slug is string => typeof slug === "string"))];
}

/**
 * 保存されている文字列を読む。古い版のデータは今の版に移す。
 * - version 1：オプションだけ（獲得した作品はまだない）
 * - version 2：獲得した作品（collected）を追加
 */
function parse(raw: string | null): SaveData {
  if (!raw) return defaultSaveData;
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return defaultSaveData;
    switch (data.version) {
      case 1:
        return { version: 2, options: parseOptions(data.options), collected: [] };
      case 2:
        return {
          version: 2,
          options: parseOptions(data.options),
          collected: parseCollected(data.collected),
        };
      default:
        return defaultSaveData;
    }
  } catch {
    return defaultSaveData;
  }
}

function readStorage(): SaveData {
  try {
    return parse(window.localStorage.getItem(SAVE_KEY));
  } catch {
    return defaultSaveData;
  }
}

/** useSyncExternalStore のため、同じ内容なら同じ参照を返す */
let cache: SaveData | null = null;
const listeners = new Set<() => void>();

export function getSaveData(): SaveData {
  cache ??= readStorage();
  return cache;
}

/** サーバー描画と最初の hydration では常に初期値を使う */
export function getServerSaveData(): SaveData {
  return defaultSaveData;
}

function write(next: SaveData): void {
  cache = next;
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(next));
  } catch {
    // 保存できなくても、このタブの中では反映されるようにする
  }
  for (const listener of listeners) listener();
}

export function updateOptions(patch: Partial<Options>): void {
  const current = getSaveData();
  write({ ...current, options: { ...current.options, ...patch } });
}

/** 獲得した作品を記録する。すでに獲得済みなら何もしない */
export function addCollected(slug: string): void {
  const current = getSaveData();
  if (current.collected.includes(slug)) return;
  write({ ...current, collected: [...current.collected, slug] });
}

export function subscribeSaveData(listener: () => void): () => void {
  listeners.add(listener);
  // 別のタブで変えたときにも追従する
  const onStorage = (event: StorageEvent) => {
    if (event.key !== SAVE_KEY) return;
    cache = parse(event.newValue);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
