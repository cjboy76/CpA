<script setup lang="ts">
import { TriangleIcon, PencilIcon } from "./Icones";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ref, watchEffect } from "vue";
import { BoxStore } from "../store";
import ColorPicker from "./ColorPicker.vue";
import { dblclickItem } from "../p5";

const colorState = ref("");
const editingBox = ref("");

watchEffect(() => {
  if (dblclickItem.value) {
    setEditingBox(dblclickItem.value);
    dblclickItem.value = "";
  }
});

function setBoxColor(color: string) {
  if (!editingBox.value) return;
  let checking = BoxStore.getBox(editingBox.value);
  checking!.setColor(color);
  colorState.value = color;
}

function deleteBox(id: string) {
  BoxStore.removeBox(id);
}

function setEditingBox(id: string) {
  editingBox.value = id;
  let checking = BoxStore.getBox(id);
  colorState.value = checking!.color;
}
</script>

<template>
  <div class="h-full">
    <div>
      <h4 class="px-2 py-1 font-bold">Boxes</h4>
      <ul>
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
                  <ColorPicker :color="colorState" @set-palette="setBoxColor" />
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </li>
        <li
          v-for="{ id, name, color } of BoxStore.boxes"
          :key="id"
          class="py-1"
          @click="setEditingBox(id)"
        >
          <div class="text-sm px-4 flex justify-between items-center">
            <div class="flex items-center">
              <triangle-icon
                class="mx-2"
                :style="{
                  color:
                    color === 'white'
                      ? 'rgb(156 163 175 / var(--tw-text-opacity))'
                      : color,
                }"
              />
              <h5>
                {{ name }}
              </h5>
              <PencilIcon
                class="text-violet-500 tetxt-xs dark:text-stone-300 mx-2"
                v-show="editingBox === id"
              />
            </div>
            <button
              class="w-5 h-5 p-1 flex justify-center items-center"
              @click.stop="deleteBox(id)"
            >
              <span> X </span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
