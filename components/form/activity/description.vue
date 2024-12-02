<template>
  <div class="mb-4">
    <BaseTextArea
      v-model="activityStore.description"
      required
      name="description"
      border
      size="sm"
      rounded="lg"
      placeholder="add a description..."
      :height="8"
    >
      <template #label>
        <div class="flex w-full justify-between">
          <BaseInputLabel label="Description" name="description">
            <template #tags>
              <BaseInputLabelBadge
                :label="`${activityFormDescriptionMinLength} char min`"
                :type="minLengthType"
              >
              </BaseInputLabelBadge>
            </template>
          </BaseInputLabel>
          <BaseCheckbox
            v-model="activityStore.assisted"
            class="pt-0.5"
            size="sm"
            position="left"
            name="assist"
            @toggled="handleToggled"
          >
            AI Assist<Icon
              name="bi:stars"
              class="h-5 w-5 text-yellow-500"
            ></Icon>
          </BaseCheckbox>
        </div>
      </template>
    </BaseTextArea>
  </div>
</template>

<script setup lang="ts">
import { useActivityStore } from "@/stores/activity.ts";
import { safeParse } from "valibot";
import {
  activityFormDescriptionMinLength,
  activityFormDescriptionMinLengthSchema,
} from "@/schemas/activityForm.schema";

const activityStore = useActivityStore();

const minLengthType = computed<"error" | "success" | "default">(() => {
  const { success } = safeParse(
    activityFormDescriptionMinLengthSchema,
    activityStore.description,
  );
  if (success) return "success";
  return "error";
});

const handleToggled = async (value: boolean) => {
  if (value) {
    await activityStore.updateSuggestions();
  }
};
</script>
