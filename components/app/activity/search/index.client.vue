<template>
  <div>
    <div class="mb-4">
      <h2 class="mb-2 border-b text-lg font-bold">Filters</h2>
      <AppActivitySearchDescriptionFilter></AppActivitySearchDescriptionFilter>
      <AppActivitySearchTagFilter></AppActivitySearchTagFilter>
      <AppActivitySearchEntityFilter></AppActivitySearchEntityFilter>
      <div class="flex w-full justify-end">
        <BaseButton
          size="sm"
          class="bg-blue-500 text-blue-50"
          :pending="status === 'pending'"
          @click="refreshRoute"
        >
          Apply
        </BaseButton>
      </div>
    </div>
    <div>
      <h2 class="mb-2 text-lg font-bold">Results ({{ data?.length }})</h2>
      <ul v-if="data">
        <li v-for="activity in data" :key="activity.id" class="mb-4">
          <AppActivity
            v-bind="activity"
            :queried-entities="
              query.entities.map((entity) => ({ name: entity }))
            "
            :queried-tags="query.tags.map((tag) => ({ name: tag }))"
          >
          </AppActivity>
        </li>
      </ul>
      <div class="mb-20"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const p = useUrlSearchParams("history");
const params = useState<{
  tags: string[];
  entities: string[];
  description: string;
}>("query", () => ({
  tags: decodeListFromQueryParams(p.tags) ?? [],
  entities: decodeListFromQueryParams(p.entities) ?? [],
  description: Array.isArray(p.description)
    ? p.description.join("")
    : p.description,
}));

const query = reactive({
  tags: params.value.tags,
  entities: params.value.entities,
  description: params.value.description,
});

watch(params, (val) => {
  for (const key in val) {
    const query = val[key as keyof typeof val];
    p[key] = query;
    if (query === "") delete p[key];
  }
});

const { onResponseError, onRequestError } = useLogging();
const { data, refresh, status } = await useFetch("/api/activities", {
  onResponseError,
  onRequestError,
  params,
  watch: false,
});

const router = useRouter();
const refreshRoute = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tags: params.value.tags,
      entities: params.value.entities,
      description: params.value.description,
    },
  });
  refresh();
  query.description = params.value.description;
  query.entities = params.value.entities;
  query.tags = params.value.tags;
};
</script>
