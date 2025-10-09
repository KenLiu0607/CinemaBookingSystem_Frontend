import { createApp, onMounted } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/dark/css-vars.css";
import icons from "@/icon";
import router from "@/router";

const app = createApp(App);

//全域註冊 icons
for (const [key, component] of Object.entries(icons)) {
    app.component(key, component);
}

app.use(ElementPlus).use(router).mount("#app");
