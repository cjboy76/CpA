<template>
  <div class="w-80 p-2">
    <h5 class="font-semibold">Color</h5>

    <input
      @input="emit('setPalette', palette)"
      v-model="palette"
      type="text"
      class="my-1 block w-full px-3 py-2 rounded-md text-sm shadow-sm text-stone-800 dark:text-stone-300 focus:outline-none bg-stone-200 dark:bg-stone-600"
    />

    <div class="my-2 flex flex-wrap">
      <button
        v-for="color of ColorSheet"
        class="mx-1 my-0.5 w-8 h-8 rounded-full drop-shadow-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-gray-300"
        :style="{ background: color }"
        @click="setPalette(color)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ColorSheet, gradientColorSheet } from "../data/ColorSheet";
const emit = defineEmits(["setPalette"]);
const props = defineProps({
  color: String,
});

const palette = ref("");
function setPalette(color: string) {
  palette.value = color;
  emit("setPalette", color);
}

onMounted(() => {
  if (props.color) palette.value = props.color;
});
</script>
