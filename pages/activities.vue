<template>
  <div class="container h-full w-full">
    <BaseTableView v-if="data" :data="data"></BaseTableView>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { onResponseError, onRequestError } = useLogging();

const { data } = await useFetch("/api/activities", {
  onResponseError,
  onRequestError,
});
</script>
