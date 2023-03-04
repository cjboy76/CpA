<template>
  <div class="p-2 overflow-scroll" style="height: calc(100vh - 64px)">
    <div
      v-for="{ image, id } of frameList"
      :key="id"
      class="my-2 border border-stone-400 flex justify-between rounded-sm"
      @click="setBoxstore(id)"
    >
      <img
        :src="image"
        :alt="image"
        class="transition-transform w-5/6 mx-auto"
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
  let list = [];
  for (var f of FramesStore.values()) {
    list.push({
      id: f.id,
      image: f.image,
    });
  }
  return list;
});

function setBoxstore(frameId: string) {
  let targetCnv = FramesStore.get(frameId);
  console.log(targetCnv);
  BoxStore.restore(targetCnv!.frameBoxes);
}

function deleteFrames(frameId: string) {
  FramesStore.delete(frameId);
}
</script>
