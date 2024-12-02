<template>
  <div>
    <AppHeader title="Activities">
      <AppActivityCreate></AppActivityCreate>
    </AppHeader>
    <AppActivitySearch></AppActivitySearch>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Activities | likemind",
});

definePageMeta({
  middleware: "auth",
  scrollToTop: false,
});
</script>
