<template>
  <div class="p-2 overflow-scroll" style="height: calc(100vh - 64px)">
    <div
      v-for="{ image, id } of frameList"
      :key="id"
      class="my-2 border border-stone-400 flex justify-between rounded-sm"
    >
      <img
        :src="image"
        class="transition-transform w-5/6 mx-auto"
        @click="setBoxstore(id)"
      />
      <button
        class="flex justify-center items-center w-1/6 transition-colors hover:bg-red-500 hover:text-white"
        @click="deleteFrames(id)"
      >
        <TrashBin />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TrashBin } from "./Icones";
import { BoxStore, FramesStore } from "../store";
import { computed } from "vue";

const frameList = computed(() => {
  return Array.from(FramesStore, ([i, f]) => {
    return { id: f.id, image: f.image };
  });
});

function setBoxstore(frameId: string) {
  const targetCnv = FramesStore.get(frameId);
  BoxStore.restore(targetCnv!.frameBoxes);
}

function deleteFrames(frameId: string) {
  FramesStore.delete(frameId);
}
</script>
