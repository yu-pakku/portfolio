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
  version: 1;
  options: Options;
};

export const SAVE_KEY = "yuma-portfolio:save";

export const defaultSaveData: SaveData = {
  version: 1,
  options: { sound: false, effects: true },
};

/**
 * 最初の描画の前に「演出オフ」を <html> に反映するインラインスクリプト。
 * React の読み込みを待つと、一瞬だけアニメーションが動いてしまうため。
 */
export const effectsBootScript = `try{var d=JSON.parse(localStorage.getItem(${JSON.stringify(SAVE_KEY)})||"null");if(d&&d.options&&d.options.effects===false)document.documentElement.dataset.effects="off"}catch(e){}`;

function parse(raw: string | null): SaveData {
  if (!raw) return defaultSaveData;
  try {
    const data: unknown = JSON.parse(raw);
    if (
      typeof data !== "object" ||
      data === null ||
      !("version" in data) ||
      data.version !== 1
    ) {
      return defaultSaveData;
    }
    const options: Partial<Record<keyof Options, unknown>> =
      "options" in data && typeof data.options === "object" && data.options !== null
        ? data.options
        : {};
    return {
      version: 1,
      options: {
        sound:
          typeof options.sound === "boolean"
            ? options.sound
            : defaultSaveData.options.sound,
        effects:
          typeof options.effects === "boolean"
            ? options.effects
            : defaultSaveData.options.effects,
      },
    };
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

export function updateOptions(patch: Partial<Options>): void {
  const current = getSaveData();
  cache = { ...current, options: { ...current.options, ...patch } };
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(cache));
  } catch {
    // 保存できなくても、このタブの中では設定が効くようにする
  }
  for (const listener of listeners) listener();
}

export function subscribeSaveData(listener: () => void): () => void {
  listeners.add(listener);
  // 別のタブで設定を変えたときにも追従する
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
