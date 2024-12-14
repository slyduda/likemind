<template>
  <div>
    <AppHeader title="Entities"></AppHeader>
    <ul v-if="data">
      <li v-for="entity in data" :key="entity.id" class="mb-4">
        <AppEntity v-bind="entity"></AppEntity>
      </li>
    </ul>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Entities | likemind",
});

definePageMeta({
  // middleware: "auth",
  scrollToTop: false,
});

const { onResponseError, onRequestError } = useLogging();

const { data } = await useFetch("/api/entities", {
  onResponseError,
  onRequestError,
});
</script>
