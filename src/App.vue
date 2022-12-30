<script setup lang="ts">
import { p5sketch, boxes, cnv } from './p5'
import { TriangleBox } from './p5/TriangleBox';
import { onMounted, ref } from 'vue';

const sketchElement = ref()

onMounted(() => {
  p5sketch.mount(sketchElement.value)
})


function createBoxHandler() {
  boxes.push(new TriangleBox(30, 75, 58, 20, 86, 75));
}

function saveAsImage() {
  boxes.forEach((b) => (b.onDraft = false));
}


</script>

<template>
  <main>
    <p>Here is my sketch:</p>
    <button id="appendNewBox" @click='createBoxHandler'>Add a new box</button>
    <button id="saveAsImage" @click='saveAsImage'>Save canvas as image</button>
    <div id="sketch-holder" ref='sketchElement'>
      <!-- Our sketch will go here! -->
    </div>
  </main>
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
