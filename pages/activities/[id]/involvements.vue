<template>
  <div>
    <div>Involvements</div>
    <ul>
      <li v-for="involvement in data" :key="involvement.id">
        {{ involvement }}
      </li>
    </ul>
  </div>
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
