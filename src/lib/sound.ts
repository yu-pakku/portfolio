/**
 * Web Audio API で合成する効果音。音声ファイルは使わない。
 *
 * AudioContext は、最初に音を鳴らすとき（＝ユーザーが操作したとき）に作る。
 * ページを開いただけでは作らないので、勝手に鳴ることはなく、
 * ブラウザの自動再生の制限（特に iOS Safari）にも引っかからない。
 */

export type SoundName = "move" | "decide" | "cancel" | "toggle" | "grab" | "get";

type Tone = {
  frequency: number;
  /** 指定すると、鳴っている間にこの周波数まで滑らかに変える */
  endFrequency?: number;
  /** 鳴り始め（秒） */
  start: number;
  /** 長さ（秒） */
  duration: number;
  /** 音量（0〜1）。全体の音量 MASTER_VOLUME がさらに掛かる */
  gain: number;
};

/** 全体の音量。控えめにする */
const MASTER_VOLUME = 0.25;

/** 短いサイン波の組み合わせ。スタイリッシュな UI に合うよう、硬いクリック音にしない */
const recipes: Record<SoundName, Tone[]> = {
  // カーソル移動：ごく短い高めの音
  move: [{ frequency: 1320, start: 0, duration: 0.035, gain: 0.1 }],
  // 決定：上がる2音
  decide: [
    { frequency: 880, start: 0, duration: 0.06, gain: 0.12 },
    { frequency: 1320, start: 0.055, duration: 0.09, gain: 0.1 },
  ],
  // 戻る・閉じる：下がる1音
  cancel: [{ frequency: 660, endFrequency: 440, start: 0, duration: 0.09, gain: 0.1 }],
  // スイッチの切り替え
  toggle: [{ frequency: 1046, start: 0, duration: 0.05, gain: 0.1 }],
  // GRAB：低めから少し上がる音
  grab: [{ frequency: 392, endFrequency: 587, start: 0, duration: 0.14, gain: 0.12 }],
  // 獲得：明るく上がる3音
  get: [
    { frequency: 784, start: 0, duration: 0.08, gain: 0.1 },
    { frequency: 988, start: 0.07, duration: 0.08, gain: 0.1 },
    { frequency: 1319, start: 0.14, duration: 0.2, gain: 0.1 },
  ],
};

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined" || typeof window.AudioContext === "undefined")
    return null;
  try {
    context ??= new AudioContext();
  } catch {
    return null;
  }
  if (context.state === "suspended") void context.resume();
  return context;
}

/** 効果音を鳴らす。ミュートかどうかは呼び出し側（useSound）で判断する */
export function playSound(name: SoundName): void {
  const audio = getContext();
  if (!audio) return;

  const now = audio.currentTime;
  const master = audio.createGain();
  master.gain.value = MASTER_VOLUME;
  master.connect(audio.destination);

  for (const tone of recipes[name]) {
    const startAt = now + tone.start;
    const endAt = startAt + tone.duration;

    const oscillator = audio.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(tone.frequency, startAt);
    if (tone.endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(tone.endFrequency, endAt);
    }

    // プツッというノイズが出ないよう、立ち上がりと消え際をなめらかにする
    const envelope = audio.createGain();
    envelope.gain.setValueAtTime(0.0001, startAt);
    envelope.gain.exponentialRampToValueAtTime(tone.gain, startAt + 0.005);
    envelope.gain.exponentialRampToValueAtTime(0.0001, endAt);

    oscillator.connect(envelope).connect(master);
    oscillator.start(startAt);
    oscillator.stop(endAt + 0.02);
  }
}
