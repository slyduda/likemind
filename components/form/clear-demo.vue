<template>
  <form class="prose m-auto mb-12" @submit.prevent="clear">
    <h2 class="border-b pb-4">Clear Demo</h2>
    <BaseButton class="mt-2 bg-red-500 text-red-50" :pending="pending">
      Clear Data
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
const { onResponse, onResponseError } = useLogging();

definePageMeta({
  middleware: "auth",
});

const pending = ref(false);

const clear = async () => {
  pending.value = true;
  await $fetch("/api/data", {
    method: "DELETE",
    onResponseError,
    onResponse,
  });
  pending.value = false;
};
</script>
