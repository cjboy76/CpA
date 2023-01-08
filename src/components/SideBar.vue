<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ref } from "vue";
import { BoxStore } from "../store";
import ColorPicker from "./ColorPicker.vue";

const colorState = ref("");
function setColor(color: string) {
  colorState.value = color;
}
</script>

<template>
  <div class="h-full">
    <div>
      <h4 class="px-2 py-1 font-bold">Style</h4>
      <ul>
        <li class="flex items-center my-2">
          <label for="opacity" class="text-sm w-20 text-center">Opacity</label>
          <input
            id="default-range"
            type="range"
            value="100"
            class="accent-teal-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </li>
        <li class="flex items-center my-2 relative">
          <label for="color" class="text-sm w-20 text-center">Color</label>

          <Popover v-slot="{ open }" class="flex items-center">
            <PopoverButton
              :class="open ? '' : 'text-opacity-90'"
              class="rouned w-16 h-5 bg-stone-400 dark:bg-stone-700 group inline-flex items-center rounded-sm focus:outline-none"
              :style="{ background: colorState }"
            >
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/5 top-8 z-10 w-max max-w-sm px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="rounded ring-1 ring-black ring-opacity-5 bg-stone-50 dark:bg-stone-800 drop-shadow"
                >
                  <ColorPicker :color="colorState" @set-palette="setColor" />
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </li>
      </ul>
    </div>
    <div class="h-px w-full bg-violet-300"></div>
    <div>
      <h4 class="px-2 py-1 font-bold">Boxes Info</h4>
      <ul>
        <li v-for="{ id, vertex } of BoxStore.boxes" :key="id">
          <h5>Box {{ id }}</h5>
          <p>
            {{ vertex }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
