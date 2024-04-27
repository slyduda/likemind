<template>
  <div v-if="data" class="container h-full w-full">
    <div class="flex h-full flex-col">
      <AppHeader :title="data.name"> </AppHeader>
      <div class="flex">
        <NuxtLink
          exact-active-class="underline"
          :to="`/entities/${id}`"
          class="mr-2 rounded-lg px-2 py-1 hover:bg-zinc-200 dark:hover:bg-stone-800"
        >
          About
        </NuxtLink>
        <NuxtLink
          exact-active-class="underline"
          :to="`/entities/${id}/activities`"
          class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-200 dark:hover:bg-stone-800"
        >
          Activities
        </NuxtLink>
        <NuxtLink
          exact-active-class="underline"
          :to="`/entities/${id}/relationships`"
          class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-200 dark:bg-stone-800 dark:hover:bg-stone-800"
        >
          Relationships
        </NuxtLink>
        <NuxtLink
          exact-active-class="underline"
          :to="`/entities/${id}/tags`"
          class="mx-2 rounded-lg px-2 py-1 hover:bg-zinc-200 dark:hover:bg-stone-800"
        >
          Tags
        </NuxtLink>
      </div>
      <div id="entity-content" class="flex-1">
        <NuxtPage></NuxtPage>
      </div>
    </div>
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

const { data } = await useFetch(`/api/entities/${id}`, {
  method: "get",
});
</script>
