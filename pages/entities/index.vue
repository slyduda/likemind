<template>
  <div class="container h-full w-full">
    <AppHeader title="Entities"></AppHeader>
    <ul v-if="data">
      <li v-for="entity in data" :key="entity.id" class="mb-4">
        <NuxtLink :to="`/entities/${entity.id}`">
          <div>
            <div class="text-lg">{{ entity.name }}</div>
            <div class="text-sm text-gray-500">Entity {{ entity.id }}</div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { onResponseError, onRequestError } = useLogging();

const { data } = await useFetch("/api/entities", {
  onResponseError,
  onRequestError,
});
</script>
