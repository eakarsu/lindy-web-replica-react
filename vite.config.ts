import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {target: process.env.VITE_API_PROXY_TARGET || "http://127.0.0.1:3001", configure(proxy) { proxy.on('proxyReq', (upstream, req, res) => { req.once('aborted', () => upstream.destroy()); res.once('close', () => { if (!('writableEnded' in res) || !res.writableEnded) upstream.destroy(); }); }); },},
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
