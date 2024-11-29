<template>
  <BaseTagsInput
    v-model="input"
    :options="filteredResults"
    :tags="query.tags"
    class="mb-4"
    name="tags"
    placeholder="search by tag..."
    :loading="loading"
    label="Tags"
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
const query = useState<{ tags: string[]; entities: string[] }>("query");

const results = ref<string[]>([]);
const filteredResults = computed<string[]>(() => {
  return results.value.filter((tag) => !query.value.tags.includes(tag));
});
const loading = ref(false);
const error = ref<string | null>(null);

const remove = (index: number) => {
  const tags = [...query.value.tags]; // Create a copy to avoid mutating original
  tags.splice(index, 1); // Remove 1 element at the specified index
  query.value = {
    ...query.value,
    tags,
  };
};

const handleSelect = (id: string) => {
  const found = results.value.find((tag) => tag === id);
  if (found)
    query.value = { ...query.value, tags: [...query.value.tags, found] };
  input.value = "";
};

const search = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await $fetch("/api/tags", {
      query: {
        name: input.value,
      },
    });
    results.value = response.map((tag) => tag.name);
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
