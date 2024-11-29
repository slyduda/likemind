<template>
  <div v-if="data">
    <AppHeader class="relative" :title="data.name ?? id">
      <template #bottom>
        <div
          class="mb-4 flex w-full overflow-x-auto border-b border-zinc-500 bg-zinc-100 py-2"
        >
          <NuxtLink
            exact-active-class="active-tab"
            :to="`/entities/${id}`"
            class="mr-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:hover:bg-stone-800"
          >
            About
          </NuxtLink>
          <NuxtLink
            exact-active-class="active-tab"
            :to="`/entities/${id}/activities`"
            class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:hover:bg-stone-800"
          >
            Activities
          </NuxtLink>
          <NuxtLink
            exact-active-class="active-tab"
            :to="`/entities/${id}/relationships`"
            class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:bg-stone-800 dark:hover:bg-stone-800"
          >
            Relationships
          </NuxtLink>
          <NuxtLink
            exact-active-class="active-tab"
            :to="`/entities/${id}/tags`"
            class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-300 dark:hover:bg-stone-800"
          >
            Tags
          </NuxtLink>
        </div>
      </template>
    </AppHeader>
    <div class="flex h-full w-full flex-col">
      <div id="entity-content" class="flex-1">
        <NuxtPage></NuxtPage>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="sticky top-0">
      <AppHeader class="relative" :title="`Entity ${id}`"></AppHeader>
    </div>
    <div id="entity-content" class="flex-1">Entity does not exist</div>
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

const { data } = await useFetch(`/api/entities/${id}`);

useHead({
  title: data.value ? `${data.value.name} | likemind` : "Entities | likemind",
});
</script>

<style>
.active-tab {
  @apply bg-zinc-200 dark:bg-stone-800;
}
</style>
