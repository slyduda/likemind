<template>
  <div>
    <AppHeader title="Communities"></AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "soft-auth",
  scrollToTop: false,
});
</script>
