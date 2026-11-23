"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import {
  getSaveData,
  getServerSaveData,
  subscribeSaveData,
  updateOptions,
  type Options,
} from "@/lib/save-data";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type OptionsContextValue = {
  options: Options;
  setOption: <K extends keyof Options>(key: K, value: Options[K]) => void;
  /** OS の「視差効果を減らす」設定がオン */
  systemReducedMotion: boolean;
  /** OS の設定 または サイト内の演出オフ。動きを止めるかどうかはこれで判断する */
  reducedEffects: boolean;
};

const OptionsContext = createContext<OptionsContextValue | null>(null);

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function setOption<K extends keyof Options>(key: K, value: Options[K]) {
  updateOptions({ [key]: value });
}

/** オプション（効果音・演出オフ）を全ページに配る。 */
export function OptionsProvider({ children }: { children: ReactNode }) {
  const { options } = useSyncExternalStore(
    subscribeSaveData,
    getSaveData,
    getServerSaveData,
  );
  const systemReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );

  // CSS 側で動きを止めるため、<html data-effects="off"> に反映する
  useEffect(() => {
    const root = document.documentElement;
    if (options.effects) delete root.dataset.effects;
    else root.dataset.effects = "off";
  }, [options.effects]);

  const value = useMemo<OptionsContextValue>(
    () => ({
      options,
      setOption,
      systemReducedMotion,
      reducedEffects: systemReducedMotion || !options.effects,
    }),
    [options, systemReducedMotion],
  );

  return <OptionsContext value={value}>{children}</OptionsContext>;
}

export function useOptions(): OptionsContextValue {
  const value = useContext(OptionsContext);
  if (!value) throw new Error("useOptions は OptionsProvider の中で使う");
  return value;
}

/** 動きを止めるべきか（OS の設定 または サイト内の演出オフ）。3D の筐体などで使う */
export function useReducedEffects(): boolean {
  return useOptions().reducedEffects;
}
