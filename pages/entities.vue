<template>
  <div class="container h-full w-full font-bold">
    <BaseTableView v-if="data" :data="data"></BaseTableView>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { data } = await useFetch("/api/entities");
</script>
