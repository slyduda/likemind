<template>
  <div>
    <AppHeader title="Activities"></AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Activities | likemind",
});

definePageMeta({
  middleware: "soft-auth",
  scrollToTop: false,
});
</script>
