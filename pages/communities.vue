<template>
  <div>
    <AppHeader title="Communities" hide-path></AppHeader>
    <BaseTableView v-if="data" :data="data"></BaseTableView>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { onResponseError, onRequestError } = useLogging();

const { data } = await useFetch("/api/communities", {
  onResponseError,
  onRequestError,
});
</script>
