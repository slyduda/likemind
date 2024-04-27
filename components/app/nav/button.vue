<template>
  <NuxtLink
    active-class="bg-zinc-200 sm:bg-zinc-200 dark:bg-stone-900 sm:dark:bg-stone-800"
    class="rounded-lg"
    :to="props.to"
  >
    <div
      class="flex rounded-lg p-2 hover:bg-zinc-300 sm:hover:bg-zinc-300 dark:hover:bg-zinc-700"
    >
      <slot name="icon">
        <AppNavIcon>
          <div>{{ props.label[0] ?? "O" }}</div>
        </AppNavIcon>
      </slot>

      <AppNavLabel :show="!props.condensed">
        {{ props.label }}
      </AppNavLabel>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  condensed: boolean;
  label: string;
}>();
</script>
