import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

const basePath = `${__dirname}/../..`;
const pathSrc = path.resolve(basePath, './src');
const pathEnv = path.resolve(basePath, './env');
const pathBuild = path.resolve(basePath, './build');
const pathCache = path.resolve(basePath, './node_modules/.vite');

export default defineConfig(({ mode }) => {
  const env = dotenv.config({ path: `${pathEnv}/.env.${mode}` });
  return {
    root: pathSrc,
    cacheDir: pathCache,
    envDir: pathEnv,
    base: env.parsed?.BASENAME || '/',
    resolve: {
      // Vite 8 native tsconfig paths resolution
      tsconfigPaths: true,
    },
    test: {
      environment: 'jsdom',
      setupFiles: path.resolve(__dirname, './vitest-setup.ts'),
      globals: true,
      mockReset: true,
    },
    server: {
      host: true,
      port: 5173,
      proxy: {
        [env.parsed?.API_URL || '/api']: {
          target: 'http://localhost:8090',
          changeOrigin: true,
          secure: false,
          rewrite: (apiPath: string) => apiPath,
        },
      },
    },
    build: {
      outDir: pathBuild,
    },
    plugins: [react()],
  };
});