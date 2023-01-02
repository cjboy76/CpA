<template>
  <div class="w-80 p-2">
    <h5>Color</h5>

    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="{ title } in tabs"
          as="template"
          :key="title"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ title }}
          </button>
        </Tab>
      </TabList>
      <input
        v-model="palette"
        type="text"
        class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none"
      />

      <TabPanels class="mt-2">
        <TabPanel
          v-for="{ title, type } in tabs"
          :key="title"
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div class="flex flex-wrap">
            <button
              v-for="color of ColorSheet"
              class="mx-1 my-0.5 w-8 h-8 rounded-full drop-shadow-md active:bg-violet-700 focus:outline-none focus:ring focus:ring-gray-300"
              :style="{ background: color[type] }"
              @click="setPalette(color[type])"
            ></button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { onMounted, ref } from "vue";
import { ColorSheet } from "../data/ColorSheet";

const emit = defineEmits(["setPalette"]);
const props = defineProps({
  palette: String,
});

const tabs: { title: string; type: "linear" | "plain" }[] = [
  { title: "Gradient", type: "linear" },
  { title: "Color", type: "plain" },
];

const palette = ref("");
function setPalette(color: string) {
  palette.value = color;
  emit("setPalette", color);
}

onMounted(() => {
  if (!props.palette) {
    setPalette(ColorSheet[0]["linear"]);
  }
});
</script>
