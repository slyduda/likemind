<template>
  <div class="container h-full w-full font-bold">
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/entities");
</script>
