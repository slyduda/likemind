<template>
  <div
    class="sticky top-0 mb-4 flex justify-between border-b border-zinc-500 bg-zinc-100 pt-4"
  >
    <div class="pb-2">
      <div class="flex items-center">
        <button
          v-if="route.path !== '/'"
          class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-300 text-zinc-500"
          @click="goBackOneSubpath"
        >
          ◀
        </button>
        <h1 class="archivo text-4xl font-extrabold">{{ title }}</h1>
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

const goBackOneSubpath = () => {
  // Get the current path
  const currentPath = route.path;

  // Check if the current path contains subpaths
  if (currentPath.includes("/")) {
    // Split the path into segments
    const segments = currentPath.split("/");

    if (segments.length === 2) return router.push("/");

    // Remove the last segment (current subpath)
    segments.pop();

    // Join the segments back together
    const newPath = segments.join("/");

    // Navigate to the new path
    router.push(newPath);
  }
};
</script>