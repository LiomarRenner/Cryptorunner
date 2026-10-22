import path from 'node:path';
import { defineConfig } from 'vitest/config';

// Unit tests cover pure functions only, so a plain Node environment is enough.
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**'],
  },
});
