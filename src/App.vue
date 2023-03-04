<script lang="ts" setup>
import SideBar from "./components/SideBar.vue";
import DrawBoard from "./components/DrawBoard.vue";
import VSpacer from "./components/VSpacer.vue";
import AppSetting from "./components/Setting.vue";
import Preview from "./components/Preview.vue";
import { onMounted, inject, watchEffect } from "vue";
import { themeReactive } from "./state";

const { theme, setTheme } = inject("themeReactive", themeReactive);

onMounted(() => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
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
      class="px-2 font-bold border-b border-violet-300 h-16 flex items-center"
    >
      <a href="/">
        <h1 class="text-xl px-2">Cpa</h1>
      </a>
      <v-spacer></v-spacer>
      <AppSetting />
    </header>
    <main class="grid grid-cols-10" style="height: calc(100vh - 64px)">
      <div class="col-span-2">
        <SideBar />
      </div>
      <div class="col-span-6">
        <DrawBoard />
      </div>
      <div class="col-span-2">
        <Preview />
      </div>
    </main>
  </div>
</template>
