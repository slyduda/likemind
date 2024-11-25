<template>
  <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <li v-for="involvement in data" :key="involvement.id" class="flex flex-1">
      <AppInvolvement v-bind="involvement"></AppInvolvement>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { onResponseError, onRequestError } = useLogging();

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/activities/${id}/involvements`, {
  onResponseError,
  onRequestError,
  params: {
    offset: 0,
    limit: 100,
  },
});
</script>
