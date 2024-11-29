<template>
  <div>
    <BaseTagsInput
      v-model="input"
      :tags="activityStore.entities"
      :options="filteredResults"
      class="mb-4"
      placeholder="add an entity..."
      label="Entities"
      @remove="remove"
      @select="handleSelect"
      @focus="search"
    >
      <template #label>
        <BaseInputLabel name="entities" label="Entities">
          <template #tags>
            <BaseInputLabelBadge label="optional"></BaseInputLabelBadge>
            <BaseInputLabelBadge
              :label="`up to ${activityFormEntitiesMaxLength}`"
              :type="maxLengthType"
            >
            </BaseInputLabelBadge>
          </template>
        </BaseInputLabel>
      </template>
    </BaseTagsInput>
  </div>
</template>

<script setup lang="ts">
import { safeParse } from "valibot";
import {
  activityFormEntitiesMaxLength,
  activityFormEntitiesMaxLengthSchema,
} from "~/schemas/activityForm.schema";
import { useActivityStore } from "~/stores/activity.ts";

const activityStore = useActivityStore();

const maxLengthType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormEntitiesMaxLengthSchema,
    activityStore.entities,
  );
  if (success) return "default";
  return "error";
});

const input = ref("");
const results = ref<string[]>([]);
const filteredResults = computed<string[]>(() => {
  return results.value.filter((tag) => !activityStore.entities.includes(tag));
});
const loading = ref(false);
const error = ref<string | null>(null);

const remove = (index: number) => {
  const entities = [...activityStore.entities]; // Create a copy to avoid mutating original
  entities.splice(index, 1); // Remove 1 element at the specified index
  activityStore.entities = entities;
};

const handleSelect = (id: string) => {
  const found = results.value.find((entity) => entity === id);
  if (found) activityStore.entities.push(found);
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
