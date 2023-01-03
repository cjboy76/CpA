<script setup lang="ts">
import { p5sketch, boxes, save as saveCanvas, cnv } from "../p5";
import { TriangleBox } from "../p5/TriangleBox";
import { onMounted, ref, watch } from "vue";

const sketchElement = ref();
const preview = ref("");

onMounted(() => {
  p5sketch.mount(sketchElement.value);
});

function createBoxHandler() {
  boxes.push(new TriangleBox(30, 95, 58, 40, 86, 95));
}

function saveAsImage() {
  saveCanvas.value = true;
}

function saveAsPreview() {
  if (!cnv.value) return;
  preview.value = cnv.value.canvas.toDataURL("image/jpeg", 0.3);
}
</script>

<template>
  <div class="relative h-full">
    <div class="absolute top-0 left-0 z-10 mx-2 my-1">
      <button class="btn-tool" id="appendNewBox" @click="createBoxHandler">
        Add a new box
      </button>
      <button class="mx-1 btn-tool" id="saveAsImage" @click="saveAsImage">
        Save canvas as image
      </button>
      <button class="btn-tool" id="saveAsPreview" @click="saveAsPreview">
        Save canvas as image
      </button>
    </div>
    <div id="sketch-holder" ref="sketchElement" class="w-full h-full">
      <!-- Our sketch will go here! -->
    </div>
  </div>
</template>
