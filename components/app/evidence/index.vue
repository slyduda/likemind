<template>
  <div class="rounded bg-zinc-200 px-2">
    <div>{{ description }}</div>
    <div class="text-sm">{{ source }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  source: string;
  description: string;
}>();
</script>
