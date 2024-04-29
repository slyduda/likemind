<template>
  <div>
    <FormDemo></FormDemo
    ><BaseButton class="mt-2 bg-red-500 text-red-50" @click="clear">
      Clear Data
    </BaseButton>
  </div>
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
