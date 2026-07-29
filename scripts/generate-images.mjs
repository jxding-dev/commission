// 원본 이미지는 루트에 그대로 보존하고, 웹용 최적화 파생 이미지를 루트 images/에 생성한다.
// 루트 상대 경로(./images/…)라서 서버 없이 file://로 열어도, Vite dev/build에서도 동작한다.
// 이 스크립트는 빌드 필수 의존성이 아니라 자산 준비용 1회성 도구다. (npm run images)
import { mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'images');

// 원본(한글명) → 웹용(영문명) 매핑. 긴 변 기준 최대 픽셀로 축소한다.
const jobs = [
  { src: '일러스트.jpg', out: 'illustration-01.jpg', maxEdge: 1600 },
  { src: '일러스트7.jpg', out: 'illustration-07.jpg', maxEdge: 1600 },
  { src: '일러스트12.jpg', out: 'illustration-12.jpg', maxEdge: 1800 },
  { src: '일러스트13.jpg', out: 'illustration-13.jpg', maxEdge: 1600 },
  { src: '일러스트14.jpg', out: 'illustration-14.jpg', maxEdge: 1600 },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  for (const job of jobs) {
    const srcPath = resolve(root, job.src);
    try {
      await access(srcPath);
    } catch {
      console.warn(`[skip] 원본 없음: ${job.src}`);
      continue;
    }
    const outPath = resolve(outDir, job.out);
    const info = await sharp(srcPath)
      .rotate() // EXIF 방향 반영
      .resize({
        width: job.maxEdge,
        height: job.maxEdge,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(outPath);
    console.log(`[ok] ${job.out} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
