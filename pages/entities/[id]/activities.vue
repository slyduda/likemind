<template>
  <div>
    <ul>
      <li v-for="(d, index) in data" :key="index">{{ d.activity }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { onResponseError, onRequestError } = useLogging();

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/entities/activities/${id}`, {
  onResponseError,
  onRequestError,
});
</script>
