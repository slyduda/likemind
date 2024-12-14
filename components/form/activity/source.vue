<template>
  <div class="relative">
    <BaseTagsInput
      v-model="input"
      required
      :tags="activityStore.sourceTags"
      class="mb-4"
      :label-tags="['up to 3']"
      placeholder="https://example.com"
      label="Sources"
      @enter="onEnter"
      @paste="onPaste"
      @remove="onRemove"
    >
      <template #label>
        <BaseInputLabel name="source-tags" label="Sources">
          <template #tags>
            <BaseInputLabelBadge
              label="required"
              :type="requiredType"
            ></BaseInputLabelBadge>
            <BaseInputLabelBadge
              label="up to 3"
              :type="maxLengthType"
            ></BaseInputLabelBadge>
            <BaseInputLabelBadge
              label="no duplicates"
              :type="duplicatesType"
            ></BaseInputLabelBadge>
          </template>
        </BaseInputLabel>
      </template>
    </BaseTagsInput>
  </div>
</template>

<script setup lang="ts">
import { safeParse } from "valibot";
import {
  activityFormSourcesMaxLengthSchema,
  activityFormSourcesMinLengthSchema,
  activityFormSourcesDuplicatesSchema,
  activityFormSourceUrlSchema,
} from "~/schemas/activityForm.schema";

const activityStore = useActivityFormStore();

const requiredType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormSourcesMinLengthSchema,
    activityStore.sources,
  );
  if (success) return "success";
  return "error";
});
const maxLengthType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormSourcesMaxLengthSchema,
    activityStore.sources,
  );
  if (success) return "default";
  return "error";
});
const duplicatesType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormSourcesDuplicatesSchema,
    activityStore.sources,
  );
  if (success) return "default";
  return "error";
});

const input = ref("");

const onRemove = (index: number, element: HTMLInputElement | null) => {
  const [source] = activityStore.sources.splice(index, 1);
  if (element) {
    input.value = source.url;
    element.value = source.url;
    element.select(); // Must do BOTH element and input value to set in same thread
  }
};

const onEnter = async () => {
  await addUrl(input.value);
};

const onPaste = async (event: ClipboardEvent) => {
  event.preventDefault();
  const text = event.clipboardData?.getData("text") ?? "";
  await addUrl(text);
};

const addUrl = async (text: string) => {
  const result = safeParse(activityFormSourceUrlSchema, text);
  if (result.success) {
    // reset the input
    input.value = "";

    await activityStore.addSource(result.output);
  }
};
</script>
