import { ref } from "vue";
import { InjectionKey } from "vue";

const theme = ref<"light" | "dark">("light");
const setTheme = (t: "light" | "dark") => (theme.value = t);

const themeReactive = {
  theme,
  setTheme,
};

const themeKey: InjectionKey<typeof themeReactive> = Symbol("themeState");

export { themeKey, themeReactive };
