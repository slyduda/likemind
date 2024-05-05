<template>
  <NuxtLink :to="`/activities/${id}`">
    <div class="rounded-xl bg-zinc-200 px-4 py-2">
      <div>{{ description }}</div>
      <div class="pb-2 text-xs text-gray-500">{{ id }}</div>
      <div class="text-xs text-gray-500">Started At: {{ startedAt }}</div>
      <div class="text-xs text-gray-500">Ended At: {{ endedAt }}</div>
      <div class="text-xs text-gray-500">Created At: {{ createdAt }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  description: string;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
}>();
</script>
