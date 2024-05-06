<template>
  <form class="prose m-auto mb-12" @submit.prevent="clear">
    <h2 class="border-b pb-4">Clear Demo</h2>
    <BaseCheckbox v-model="body.fake" class="mb-4"
      >Clear Fake Data Only</BaseCheckbox
    >
    <BaseButton class="mt-2 bg-red-500 text-red-50" :pending="pending">
      Clear Data
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
const { onResponse, onResponseError } = useLogging();

const pending = ref(false);
const body = reactive({
  fake: true,
});

const clear = async () => {
  pending.value = true;
  await $fetch("/api/data", {
    method: "DELETE",
    body,
    onResponseError,
    onResponse,
  });
  pending.value = false;
};
</script>
