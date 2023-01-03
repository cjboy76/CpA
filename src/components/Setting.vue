<template>
  <button type="button" @click="openHandler" class="btn-primary">
    Settings
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen = false" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-sm text-stone-800 dark:text-stone-300 bg-stone-50 dark:bg-stone-800 p-6 text-left align-middle shadow-xl transition-all border border-violet-300"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                Settings
              </DialogTitle>
              <div class="mt-2 flex justify-between items-center">
                <h5>Theme mode: {{ enabled ? "Dark" : "Light" }}</h5>
                <Switch
                  v-model="enabled"
                  class="relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out"
                  :class="enabled ? 'bg-violet-300 ' : 'bg-stone-700'"
                >
                  <span
                    :class="enabled ? 'translate-x-7' : '-translate-x-1'"
                    class="inline-block h-[28px] w-[28px] transform rounded-full bg-white transition drop-shadow-md"
                  />
                </Switch>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, inject, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";
import { themeReactive } from "../state";

const isOpen = ref(false);

const enabled = ref(false);

const { theme, setTheme } = inject("themeState", themeReactive);

watch(enabled, (v) => {
  const theme = enabled.value ? "dark" : "light";
  setTheme(theme);
});

function openHandler() {
  isOpen.value = true;
  enabled.value = theme.value === "dark";
}
</script>
