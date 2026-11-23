"use client";

import { useId, useRef } from "react";
import { useOptions } from "@/components/options/options-provider";

type OptionSwitchProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

function OptionSwitch({
  label,
  description,
  checked,
  disabled,
  onChange,
}: OptionSwitchProps) {
  const id = useId();
  return (
    <li className="border-border flex items-center justify-between gap-6 border-b py-4">
      <div className="flex flex-col gap-1">
        <span id={`${id}-label`} className="font-jp text-[15px]">
          {label}
        </span>
        <span
          id={`${id}-description`}
          className="text-muted font-jp text-xs leading-relaxed"
        >
          {description}
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-description`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="group focus-visible:outline-foreground flex h-11 shrink-0 items-center gap-3 rounded-full outline-offset-2 focus-visible:outline-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-muted group-aria-checked:text-foreground w-7 text-right font-mono text-[11px] tracking-[0.15em]">
          {checked ? "ON" : "OFF"}
        </span>
        <span className="border-border group-aria-checked:border-foreground group-aria-checked:bg-foreground relative h-7 w-12 rounded-full border bg-transparent transition-colors">
          <span className="bg-muted group-aria-checked:bg-background-light absolute top-1/2 left-1 size-5 -translate-y-1/2 rounded-full transition-[translate,background-color] group-aria-checked:translate-x-5" />
        </span>
      </button>
    </li>
  );
}

/** ヘッダー右の効果音ボタン。押すたびにミュートを切り替える。 */
export function SoundToggle() {
  const { options, setOption } = useOptions();
  return (
    <button
      type="button"
      aria-pressed={options.sound}
      aria-label="効果音"
      onClick={() => setOption("sound", !options.sound)}
      className="border-border-strong text-foreground-soft hover:border-foreground focus-visible:outline-foreground grid size-11 place-items-center rounded-full border outline-offset-2 transition-colors focus-visible:outline-1"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        {options.sound ? (
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
        ) : (
          <path d="m22 9-6 6M16 9l6 6" />
        )}
      </svg>
    </button>
  );
}

/** ヘッダー右の Options ボタンと、オプション画面（ネイティブの <dialog>）。 */
export function OptionsMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { options, setOption, systemReducedMotion } = useOptions();

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="border-border-strong text-foreground-soft hover:border-foreground focus-visible:outline-foreground h-11 rounded-full border px-4 text-[13px] outline-offset-2 transition-colors focus-visible:outline-1 sm:px-4.5"
      >
        Options
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="options-title"
        // 枠の外（背景）を押したら閉じる。中身は内側の div が受けるので target は dialog にならない
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="border-border bg-background-light text-foreground m-auto w-[min(420px,calc(100%-32px))] rounded-2xl border p-0 shadow-[0_24px_60px_rgba(30,25,20,0.18)] backdrop:bg-[rgba(26,26,25,0.32)]"
      >
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-baseline justify-between">
            <h2 id="options-title" className="text-2xl font-extralight tracking-tight">
              Options
            </h2>
            <span className="text-muted font-mono text-[11px] tracking-[0.3em]">
              SETTINGS
            </span>
          </div>

          <ul className="border-border border-t">
            <OptionSwitch
              label="効果音"
              description="操作したときに小さな音を鳴らします"
              checked={options.sound}
              onChange={(checked) => setOption("sound", checked)}
            />
            <OptionSwitch
              label="演出"
              description={
                systemReducedMotion
                  ? "端末の「視差効果を減らす」がオンのため、動きを止めています"
                  : "アニメーションとページ遷移"
              }
              checked={!systemReducedMotion && options.effects}
              disabled={systemReducedMotion}
              onChange={(checked) => setOption("effects", checked)}
            />
          </ul>

          <form method="dialog" className="flex justify-end">
            <button className="bg-foreground text-background-light focus-visible:outline-foreground h-11 rounded-full px-6 text-[13px] outline-offset-2 focus-visible:outline-1">
              閉じる
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
