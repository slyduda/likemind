<template>
  <div>
    <AppHeader title="Involvements"></AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Involvements | likemind",
});

definePageMeta({
  middleware: "soft-auth",
});
</script>
