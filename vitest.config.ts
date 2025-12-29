import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/__mocks__/**', '**/*.interceptor.ts'],
    setupFiles: [],
    deps: {
      interopDefault: true,
    },
  },
})
