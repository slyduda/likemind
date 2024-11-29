<template>
  <div
    class="h-2 w-2 rounded-full"
    :class="[{ 'bg-blue-500': active }, { 'bg-zinc-500': !active }]"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>
