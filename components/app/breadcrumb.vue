<template>
  <ul class="font-mono text-xs font-bold text-zinc-500 sm:text-sm">
    <li v-for="(piece, index) in pieces" :key="index" class="inline-block">
      <div class="mx-1 inline-block">/</div>
      <NuxtLink
        :to="breadcrumbs[index]"
        class="rounded px-1.5 py-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-800"
      >
        {{ piece }}
      </NuxtLink>
    </li>
    <li class="inline-block">
      <div class="mx-1 inline-block">{{ include ? "/" : "" }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
  include?: boolean;
}>();
const pieces = computed(() => {
  return props.path ? props.path.substring(1).split("/") : [];
});
const breadcrumbs = computed(() => {
  const pathSegments = props.path.substring(1).split("/");
  let cumulativePath = "";
  return pathSegments.map((segment) => {
    cumulativePath += "/" + segment;
    return cumulativePath;
  });
});
</script>
