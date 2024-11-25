<template>
  <div>
    <AppHeader title="Settings" hide-path></AppHeader>
    <FormDemo></FormDemo>
    <FormClearDemo></FormClearDemo>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
