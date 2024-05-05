<template>
  <div>
    <AppHeader hide-path>
      <template #title>
        <h1 class="archivo whitespace-nowrap text-4xl font-extrabold">
          likemind
        </h1></template
      >
    </AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "likemind",
  ogTitle: "likemind",
  description:
    "likemind is an app that maps organizational relationships in an effort to increase accountability.",
  ogDescription:
    "likemind is an app that maps organizational relationships in an effort to increase accountability.",
  ogImage: "/likemind-banner.png",
  twitterCard: "summary_large_image",
});
</script>
