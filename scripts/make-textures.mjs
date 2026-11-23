/**
 * 作品画像から、UFOキャッチャーの景品（箱の窓）に貼る縮小版を作る。
 *
 *   npm run textures
 *
 * public/works/ の画像（png / jpg / webp）を読み、窓の比率 4:3 に中央で切り抜いて
 * public/works/textures/<同じ名前>.webp に書き出す。元の画像は変更しない。
 * 作品を追加・差し替えたら実行し、書き出した画像もコミットする。
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/works");
const OUTPUT_DIR = path.join(SOURCE_DIR, "textures");

/** 窓の大きさ。スマホでの描画負荷を考え、2 の累乗に近い小さめのサイズにする */
const WIDTH = 512;
const HEIGHT = 384;
const QUALITY = 80;

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

await mkdir(OUTPUT_DIR, { recursive: true });

const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
const sources = entries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => SOURCE_EXTENSIONS.has(path.extname(name).toLowerCase()))
  .sort();

if (sources.length === 0) {
  console.error(`画像が見つかりません：${SOURCE_DIR}`);
  process.exit(1);
}

for (const name of sources) {
  const input = path.join(SOURCE_DIR, name);
  const output = path.join(OUTPUT_DIR, `${path.parse(name).name}.webp`);

  await sharp(input)
    .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
    .webp({ quality: QUALITY })
    .toFile(output);

  const { size } = await stat(output);
  console.log(
    `${name} → textures/${path.basename(output)}（${Math.round(size / 1024)} KB）`,
  );
}
