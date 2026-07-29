import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// 정적 배포의 하위 경로에서도 자산이 깨지지 않도록 상대 경로 base를 사용한다.
// 특정 도메인/하위 경로가 확정되면 base 값을 조정한다. (README 참고)
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        // 다중 페이지 빌드: 두 HTML 페이지를 모두 결과물에 포함한다.
        index: resolve(__dirname, 'index.html'),
        adoption: resolve(__dirname, 'adoption.html'),
      },
    },
  },
});
