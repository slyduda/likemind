<template>
  <div>
    <BaseTagsInput
      v-model="input"
      :tags="activityStore.tags"
      :options="filteredResults"
      class="mb-4"
      placeholder="add a tag..."
      label="Tags"
      @remove="remove"
      @select="handleSelect"
      @focus="search"
    >
      <template #label>
        <BaseInputLabel name="tags" label="Tags">
          <template #tags>
            <BaseInputLabelBadge label="optional"></BaseInputLabelBadge>
            <BaseInputLabelBadge
              :label="`up to ${activityFormTagsMaxLength}`"
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
  activityFormTagsMaxLength,
  activityFormTagsMaxLengthSchema,
} from "~/schemas/activityForm.schema";
import { useActivityStore } from "~/stores/activity.ts";

const activityStore = useActivityStore();

const maxLengthType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormTagsMaxLengthSchema,
    activityStore.tags,
  );
  if (success) return "default";
  return "error";
});

const input = ref("");
const results = ref<string[]>([]);
const filteredResults = computed<string[]>(() => {
  return results.value.filter((tag) => !activityStore.tags.includes(tag));
});
const loading = ref(false);
const error = ref<string | null>(null);

const remove = (index: number) => {
  const tags = [...activityStore.tags]; // Create a copy to avoid mutating original
  tags.splice(index, 1); // Remove 1 element at the specified index
  activityStore.tags = tags;
};

const handleSelect = (id: string) => {
  const found = results.value.find((tag) => tag === id);
  if (found) activityStore.tags.push(found);
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
