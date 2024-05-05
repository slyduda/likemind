<template>
  <NuxtLink :to="`/entities/${id}`">
    <div class="rounded-xl bg-zinc-200 px-4 py-2">
      <div class="text-lg">{{ name }}</div>
      <div class="pb-2 text-xs text-gray-500">{{ id }}</div>
      <div class="text-xs text-gray-500">Created At: {{ createdAt }}</div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  createdAt: string;
}>();
</script>
