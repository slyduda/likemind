<template>
  <div class="flex h-full w-full flex-grow text-zinc-900 dark:text-zinc-100">
    <div
      id="fake_nav"
      class="flex-shrink-0 bg-zinc-100 sm:hidden dark:bg-zinc-900"
      :class="[{ 'w-16': !hiddenSidebar }, { 'w-0': hiddenSidebar }]"
    ></div>

    <AppNavBar
      v-model:collapsed="collapsedSidebar"
      v-model:hidden="hiddenSidebar"
      class="h-full flex-shrink-0"
    />

    <div class="w-1 flex-1 bg-zinc-200 dark:bg-zinc-950">
      <div
        class="h-full w-full p-2"
        :class="[{ 'pl-2': hiddenSidebar }, { 'pl-0': !hiddenSidebar }]"
      >
        <div
          class="h-full overflow-auto rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900"
        >
          <slot />
        </div>
      </div>
    </div>

    <div
      class="absolute h-full w-full sm:hidden"
      :class="[
        { 'pointer-events-none bg-black/0': collapsedSidebar },
        {
          'pointer-events-auto bg-black/10 backdrop-blur-md': !collapsedSidebar,
        },
      ]"
      @click="collapsedSidebar = !collapsedSidebar"
    ></div>

    <NuxtLoadingIndicator :height="8" color="#3b82f6" />
  </div>
</template>

<script setup lang="ts">
const collapsedSidebar = ref(false);
const hiddenSidebar = ref(false);
</script>
