<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ref } from "vue";
import ColorPicker from "./ColorPicker.vue";

const colorState = ref("");
function setColor(color: string) {
  colorState.value = color;
  console.log(colorState.value);
}
</script>

<template>
  <div class="border border-white">
    <h4>
      Box
      {{ colorState }}
    </h4>
    <div>
      <div class="flex items-center">
        <label for="opacity" class="text-sm w-20 text-center">Opacity</label>
        <input
          id="default-range"
          type="range"
          value="100"
          class="accent-teal-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div class="flex items-center">
        <label for="color" class="text-sm w-20 text-center">Color</label>

        <Popover v-slot="{ open }" class="relative">
          <PopoverButton
            :class="open ? '' : 'text-opacity-90'"
            class="group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <div class="rouned bg-pink-500 w-10 h-2"></div>
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
              class="absolute left-[15vw] z-10 w-max max-w-sm px-4 sm:px-0 lg:max-w-3xl"
            >
              <div
                class="rounded shadow-lg ring-1 ring-black ring-opacity-5 bg-white text-black"
              >
                <ColorPicker :palette="colorState" @set-palette="setColor" />
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
