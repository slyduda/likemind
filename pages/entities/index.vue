<template>
  <div>
    <AppHeader title="Entities"></AppHeader>
    <ul v-if="data">
      <li v-for="entity in data" :key="entity.id" class="mb-4">
        <AppEntity v-bind="entity"></AppEntity>
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
