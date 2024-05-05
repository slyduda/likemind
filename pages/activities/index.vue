<template>
  <div>
    <AppHeader title="Activities"></AppHeader>
    <ul v-if="data">
      <li v-for="activity in data" :key="activity.id" class="mb-4">
        <AppActivity v-bind="activity"></AppActivity>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Activities | likemind",
});

definePageMeta({
  middleware: "auth",
});

const { onResponseError, onRequestError } = useLogging();

const { data } = await useFetch("/api/activities", {
  onResponseError,
  onRequestError,
});
</script>
