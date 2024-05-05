<template>
  <div>
    <ul v-if="data">
      <li v-for="(d, index) in data" :key="index" class="mb-4">
        <AppActivity v-bind="d"></AppActivity>
      </li>
    </ul>
    <div class="mb-20"></div>
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
