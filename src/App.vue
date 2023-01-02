<script lang="ts" setup>
import MaterialSymbolsSettings from "./components/Icons/MaterialSymbolsSettings.vue";
import SideBar from "./components/SideBar.vue";
import DrawBoard from "./components/DrawBoard.vue";
import VSpacer from "./components/VSpacer.vue";
</script>
<template>
  <div id="app">
    <header class="font-bold border border-white h-16 flex items-center">
      <button
        classic
        type="button"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <MaterialSymbolsSettings class="text-xl" />
      </button>
      <h1 class="text-xl px-2">Clip-path Animate</h1>
      <v-spacer></v-spacer>
      <button
        classic
        type="button"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Edit
      </button>
      <button
        classic
        type="button"
        class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Result
      </button>
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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
