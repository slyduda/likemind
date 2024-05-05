<template>
  <form class="prose m-auto mb-12" @submit.prevent="clear">
    <h2 class="border-b pb-4">Clear Demo</h2>
    <BaseButton class="mt-2 bg-red-500 text-red-50" @click="clear">
      Clear Data
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
const { onResponse, onResponseError } = useLogging();

definePageMeta({
  middleware: "auth",
});

const clear = () => {
  $fetch("/api/data", {
    method: "DELETE",
    onResponseError,
    onResponse,
  });
};
</script>
