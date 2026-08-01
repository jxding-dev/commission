// 다중 페이지(MPA) 빌드 후처리.
// Vite가 페이지 간 <a href="./page.html"> 링크를 해시된 복사본(dist/assets/*.html)으로
// 바꾸는 알려진 동작이 있어, (1) 중복 해시 HTML을 제거하고 (2) 루트 페이지의 href를
// 깔끔한 ./page.html 로 복원한다. base './' 유지.
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const assetsDir = join(dist, 'assets');

// 페이지 이름은 반드시 긴 것부터(“index-ja”가 “index”보다 먼저 매칭되도록)
const pages = ['index-ja', 'adoption-ja', 'index', 'adoption'];
const hashedHtmlRe = new RegExp(
  '\\.?/?assets/(' + pages.join('|') + ')-[0-9a-f]+\\.html',
  'g'
);

async function main() {
  // 1) dist/assets 안의 해시된 HTML 복사본 삭제
  let assetFiles = [];
  try {
    assetFiles = await readdir(assetsDir);
  } catch {
    /* assets 없음 */
  }
  for (const f of assetFiles) {
    if (f.endsWith('.html')) await rm(join(assetsDir, f));
  }

  // 2) 루트 HTML의 해시된 페이지 링크를 깔끔한 상대경로로 복원
  const rootFiles = (await readdir(dist)).filter((f) => f.endsWith('.html'));
  for (const f of rootFiles) {
    const p = join(dist, f);
    const html = await readFile(p, 'utf8');
    const fixed = html.replace(hashedHtmlRe, './$1.html');
    if (fixed !== html) {
      await writeFile(p, fixed);
      console.log(`[postbuild] 링크 정리: ${f}`);
    }
  }
  console.log('[postbuild] 완료');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
