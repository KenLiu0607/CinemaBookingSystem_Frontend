import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/api": {
                target: "https://localhost:7244", // 你的 .NET API URL
                changeOrigin: true,
                secure: false, // 如果你用的是 https://localhost，要加這個
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // 這行讓 @ 指到 src
        },
    },
});
