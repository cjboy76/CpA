import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { themeKey, themeReactive } from "./state";

createApp(App).provide(themeKey, themeReactive).mount("#app");
