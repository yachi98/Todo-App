// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   rollupOptions: {
//     external: ["react", "react-router", "react-router-dom"],
//     output: {
//       globals: {
//         react: "React",
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
