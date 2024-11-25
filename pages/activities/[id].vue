<template>
  <div v-if="data" class="flex h-full w-full flex-col">
    <div class="sticky top-0">
      <AppHeader class="relative" :title="`Activity ${data.id}`"></AppHeader>
      <div
        class="-mt-4 mb-4 flex w-full overflow-x-auto border-b border-zinc-500 bg-zinc-100 py-2"
      >
        <NuxtLink
          exact-active-class="active-tab"
          :to="`/activities/${id}`"
          class="mr-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:hover:bg-stone-800"
        >
          About
        </NuxtLink>
        <NuxtLink
          exact-active-class="active-tab"
          :to="`/activities/${id}/involvements`"
          class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:hover:bg-stone-800"
        >
          Involvements
        </NuxtLink>
      </div>
    </div>
    <div id="activity-content" class="flex-1">
      <NuxtPage></NuxtPage>
    </div>
  </div>
  <div v-else>
    <div class="sticky top-0">
      <AppHeader class="relative" :title="`Activity ${id}`"></AppHeader>
    </div>
    <div id="activity-content" class="flex-1">Activity does not exist</div>
  </div>
</template>

<script setup lang="ts">
import { safeParse } from "valibot";
import { entityIdSchema } from "~/schemas/entity.schema";

definePageMeta({
  middleware: "auth",
  validate: async (route) => {
    const result = safeParse(entityIdSchema, route.params.id);
    if (!result.success) return false;
    return true;
  },
});

const route = useRoute();
const id = Array.isArray(route.params.id)
  ? route.params.id.join()
  : route.params.id;

const { data } = await useFetch(`/api/activities/${id}`);

useHead({
  title: data.value
    ? `Activity ${data.value.id} | likemind`
    : "Activities | likemind",
});
</script>

<style>
.active-tab {
  @apply bg-zinc-200 dark:bg-stone-800;
}
</style>
