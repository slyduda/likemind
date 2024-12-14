<template>
  <div>
    <BaseTagsInput
      v-model="input"
      :tags="activityStore.entities.map((entity) => entity.name)"
      :options="filteredResults"
      class="mb-4"
      placeholder="add an entity..."
      label="Entities"
      @remove="remove"
      @select="handleSelect"
      @enter="handleEnter"
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
  activityFormEntityNameSchema,
} from "~/schemas/activityForm.schema";

const activityStore = useActivityFormStore();

const maxLengthType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormEntitiesMaxLengthSchema,
    activityStore.entities,
  );
  if (success) return "default";
  return "error";
});

const input = ref("");
const results = ref<{ id: string; name: string }[]>([]);
const filteredResults = computed<string[]>(() => {
  const entityIds = activityStore.entities.map((e) => e.id);
  return results.value
    .filter((result) => !entityIds.includes(result.id))
    .map((e) => e.name);
});
const loading = ref(false);
const error = ref<string | null>(null);

const remove = (index: number) => {
  const entities = [...activityStore.entities]; // Create a copy to avoid mutating original
  entities.splice(index, 1); // Remove 1 element at the specified index
  activityStore.entities = entities;
};

const handleSelect = (index: number) => {
  const found = results.value[index];
  if (found) activityStore.entities.push(found);
  input.value = "";
};

const handleEnter = () => {
  const result = safeParse(activityFormEntityNameSchema, input.value);
  if (result.success) {
    // reset the input
    input.value = "";

    activityStore.entities.push({
      id: null,
      name: result.output,
    });
  }
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
    results.value = response.map((entity) => ({
      id: entity.id,
      name: entity.name,
    }));
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
