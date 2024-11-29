<template>
  <BaseTagsInput
    v-model="input"
    :options="filteredResults"
    :tags="query.entities"
    class="mb-4"
    name="entities"
    placeholder="search by entity..."
    :loading="loading"
    label="Entities"
    type="default"
    border
    :rounded="'xl'"
    @focus="search"
    @remove="remove"
    @select="handleSelect"
  >
  </BaseTagsInput>
</template>

<script lang="ts" setup>
const input = ref("");
const query = useState<{
  tags: string[];
  entities: string[];
  description: string;
}>("query");

const results = ref<string[]>([]);
const filteredResults = computed<string[]>(() => {
  return results.value.filter((tag) => !query.value.entities.includes(tag));
});
const loading = ref(false);
const error = ref<string | null>(null);

const remove = (index: number) => {
  const entities = [...query.value.entities]; // Create a copy to avoid mutating original
  entities.splice(index, 1); // Remove 1 element at the specified index
  query.value = {
    ...query.value,
    entities,
  };
};

const handleSelect = (id: string) => {
  const found = results.value.find((entity) => entity === id);
  if (found)
    query.value = {
      ...query.value,
      entities: [...query.value.entities, found],
    };
  input.value = "";
};

const search = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch("/api/entities", {
      query: {
        name: input.value,
        limit: 10,
      },
    });
    results.value = response.map((entity) => entity.name);
  } catch {
    error.value = "An Error Occured";
  } finally {
    loading.value = false;
  }
};

watch(input, () => {
  loading.value = true;
});

watchDebounced(
  input,
  () => {
    search();
  },
  { debounce: 1000 },
);
</script>
