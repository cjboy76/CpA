<script setup lang="ts">
import { p5sketch, save as saveCanvas, cnv } from "../p5";
import { onMounted, ref } from "vue";
import { BoxStore, FramesStore } from "../store";
import { cloneTriangleboxMap, generateOTID } from "../composoble";

const sketchElement = ref();

onMounted(() => {
  p5sketch.mount(sketchElement.value);
});

function createBoxHandler() {
  BoxStore.createBox();
}

function saveAsImage() {
  saveCanvas.value = true;
}

function clearCanvas() {
  BoxStore.clear();
}

function saveAsPreview() {
  if (!cnv.value) return;
  const image = cnv.value.canvas.toDataURL("image/jpeg", 0.3);
  const frameBoxes = cloneTriangleboxMap(BoxStore.boxesMap);
  console.log({ frameBoxes });
  const id = generateOTID();

  FramesStore.set(id, {
    id,
    image,
    frameBoxes,
    frameWidth: sketchElement.value.clientWidth,
    frameHeight: sketchElement.value.clientHeight,
  });
}
</script>

<template>
  <div class="relative h-full">
    <div class="absolute top-0 left-0 z-10 mx-2 my-1">
      <button class="btn-tool" id="appendNewBox" @click="createBoxHandler">
        Create a new box
      </button>
      <button class="mx-1 btn-tool" id="saveAsImage" @click="saveAsImage">
        Save image
      </button>
      <button class="btn-tool" @click="saveAsPreview">Save canvas</button>
      <button class="btn-tool" @click="clearCanvas">Clear canvas</button>
    </div>
    <div id="sketch-holder" ref="sketchElement" class="w-full h-full">
      <!-- Our sketch will go here! -->
    </div>
  </div>
</template>
