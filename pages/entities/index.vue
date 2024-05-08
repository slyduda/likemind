<template>
  <div>
    <AppHeader title="Entities"></AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Entities | likemind",
});

definePageMeta({
  middleware: "soft-auth",
});
</script>
