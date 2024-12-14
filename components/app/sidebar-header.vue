<template>
  <div class="sticky top-0 z-20 mb-4">
    <div
      class="z-30 flex w-full justify-between border-b border-zinc-500 bg-zinc-100 pt-4"
    >
      <div class="w-full">
        <div class="flex w-full justify-between pb-2">
          <div class="flex w-full items-center overflow-hidden">
            <button
              class="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-300"
              @click="emit('toggle')"
            >
              <Icon
                name="solar:sidebar-minimalistic-bold-duotone"
                class="h-full w-full"
              ></Icon>
            </button>
            <h1
              v-if="title"
              class="archivo whitespace-nowrap text-4xl font-extrabold"
            >
              {{ title }}
            </h1>

            <slot v-else name="title"></slot>
          </div>
          <div class="flex items-center">
            <AppFormClose></AppFormClose>
          </div>
        </div>
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["toggle"]);
defineProps<{
  title?: string;
}>();
</script>
