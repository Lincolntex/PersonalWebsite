import { defineConfig } from 'vite'
import * as child from "child_process";
import react from '@vitejs/plugin-react';
import { BASE } from "./src/const";

const commitHash = 
    child.execSync('git rev-parse --short HEAD').toString();


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  base: BASE,
  plugins: [react()],
})
