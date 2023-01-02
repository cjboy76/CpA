<script lang="ts" setup>
import SideBar from "./components/SideBar.vue";
import DrawBoard from "./components/DrawBoard.vue";
import VSpacer from "./components/VSpacer.vue";
import AppSetting from "./components/Setting.vue";
import { onMounted, inject, watchEffect } from "vue";
import { themeReactive } from "./state";

const { theme, setTheme } = inject("themeReactive", themeReactive);

onMounted(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
    console.log(theme.value);
    return;
  }

  if (localStorage.theme) setTheme(localStorage.theme);
});

watchEffect(() => {
  if (theme.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>
<template>
  <div
    id="app"
    class="h-screen bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-300"
  >
    <header
      class="px-2 font-bold border-b border-gray-300 h-16 flex items-center"
    >
      <h1 class="text-xl px-2">Clip-path Animate</h1>
      <v-spacer></v-spacer>
      <AppSetting />
      <button type="button" class="btn-primary mx-1">Edit</button>
      <button type="button" class="btn-primary mx-1">Result</button>
    </header>
    <main class="grid grid-cols-10 h-full">
      <div class="col-span-2">
        <SideBar />
      </div>
      <div class="col-span-6">
        <DrawBoard />
      </div>
      <div class="col-span-2">Frames</div>
    </main>
  </div>
</template>
