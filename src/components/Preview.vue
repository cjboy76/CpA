<template>
  <div class="p-2 overflow-scroll" style="height: calc(100vh - 64px)">
    <div
      v-for="(frame, index) of FramesStore"
      :key="frame.image"
      class="my-2 border border-stone-400 flex justify-between rounded-sm"
    >
      <img
        :src="frame.image"
        :alt="frame.image"
        class="transition-transform w-5/6 mx-auto"
      />
      <button
        class="flex justify-center items-center w-1/6 transition-colors hover:bg-red-500 hover:text-white"
        @click="deleteFrames(index)"
      >
        <TrashBin />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TrashBin } from "./Icones";
import { FramesStore } from "../store";

function deleteFrames(index: number) {
  FramesStore.splice(index, 1);
}
</script>
