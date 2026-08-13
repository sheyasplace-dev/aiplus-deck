import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Two entries: the prospectus and the enquiry form the rate card links to.
// Without this, `vite build` only picks up index.html and /enquire.html 404s
// in production even though it works in dev.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        enquire: resolve(import.meta.dirname, 'enquire.html'),
      },
    },
  },
});
