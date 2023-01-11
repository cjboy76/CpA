<template>
  <h5>Frames</h5>
  <div class="px-2">
    <div
      v-for="image of framesList"
      :key="image"
      class="border border-stone-400 flex justify-between rounded-sm"
    >
      <img
        :src="image"
        :alt="image"
        class="transition-transform w-5/6 mx-auto"
      />
      <button
        class="flex justify-center items-center w-1/6 transition-colors hover:bg-red-500 hover:text-white"
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
</script>
