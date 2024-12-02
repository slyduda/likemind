<template>
  <a
    class="block w-full rounded-lg bg-zinc-200 p-2"
    :href="source"
    target="_blank"
  >
    <div class="flex items-center">
      <Icon name="solar:link-square-line-duotone"></Icon>
      <div class="pl-2 text-sm">{{ getDomainAndTLD(source) }}</div>
    </div>
    <div class="text-sm">{{ trimArticleToMaxLength(description, 250) }}</div>
  </a>
</template>

<script lang="ts" setup>
defineProps<{
  source: string;
  description: string;
}>();
</script>
