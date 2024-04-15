<template>
  <div class="font-bold h-full">
    {{ data }}
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/entities");
</script>
