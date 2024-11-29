<template>
  <BaseBadge
    :label="truncateText(name, 36)"
    class="mb-1 mr-1 text-white"
    :class="[{ 'bg-yellow-500': overlaps }, { 'bg-zinc-700': !overlaps }]"
  />
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  overlaps?: boolean;
}>();
</script>
