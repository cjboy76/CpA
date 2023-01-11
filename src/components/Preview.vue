<template>
  <div class="p-2 overflow-scroll" style="height: calc(100vh - 64px)">
    <div
      v-for="image of framesList"
      :key="image"
      class="my-2 border border-stone-400 flex justify-between rounded-sm"
    >
      <img
        :src="image"
        :alt="image"
        class="transition-transform w-5/6 mx-auto"
      />
      <button
        class="flex justify-center items-center w-1/6 transition-colors hover:bg-red-500 hover:text-white"
        @click="deleteFrames(image)"
      >
        <TrashBin />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TrashBin } from "./Icones";
import { computed } from "vue";
import { FramesStore } from "../store";

const framesList = computed(() => {
  return [...FramesStore];
});

function deleteFrames(image: string) {
  FramesStore.delete(image);
}
</script>
