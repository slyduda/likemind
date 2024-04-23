<template>
  <div
    class="sticky top-0 mb-4 flex justify-between border-b border-zinc-500 bg-stone-900"
  >
    <div class="pb-2">
      <div class="flex">
        <div
          class="flex h-8 w-8 items-center justify-center"
          @click="router.back()"
        >
          ◀
        </div>
        <h1 class="archivo text-2xl">{{ title }}</h1>
      </div>
      <AppBreadcrumb v-if="!hidePath" :path="route.fullPath"></AppBreadcrumb>
    </div>
    <div class="flex items-center pb-2">
      <slot></slot>

      <a
        v-if="false"
        :href="bbUrl"
        target="_blank"
        class="ml-2 flex h-8 w-8 items-center justify-center"
      >
        <SvgBitbucket class="h-6" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const router = useRouter();

const strippedPath = computed(() => removeLastBackslash(route.fullPath));
const bbUrl = computed(
  () =>
    runtimeConfig.public.repoBase +
    (!props.namedFile
      ? strippedPath.value + "/index.vue"
      : strippedPath.value + ".vue"),
);

const props = defineProps<{
  title: string;
  hidePath?: boolean;
  namedFile?: boolean;
}>();
</script>
