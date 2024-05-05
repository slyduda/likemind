<template>
  <AppHeader class="not-prose" :title="title"></AppHeader>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
