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
  boxes.push(new TriangleBox(30, 75, 58, 20, 86, 75));
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
  <main>
    <p>Here is my sketch:</p>
    <button classic id="appendNewBox" @click="createBoxHandler">
      Add a new box
    </button>
    <button classic id="saveAsImage" @click="saveAsImage">
      Save canvas as image
    </button>
    <button classic id="saveAsPreview" @click="saveAsPreview">
      Save canvas as image
    </button>
    <div id="sketch-holder" ref="sketchElement">
      <!-- Our sketch will go here! -->
    </div>
    <img :src="preview" alt="preview" />
  </main>
</template>
