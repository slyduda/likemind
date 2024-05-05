<template>
  <form class="prose m-auto mb-12" @submit.prevent="onSubmit">
    <h2 class="border-b pb-4">Load Demo</h2>
    <BaseInput
      v-model="entityCount"
      v-bind="entityCountAttrs"
      class="mb-4"
      name="entityCount"
      label="Entity Count"
      type="number"
      border
      :rounded="'xl'"
      :error="errors.entityCount"
    />
    <BaseInput
      v-model="activityCount"
      v-bind="activityCountAttrs"
      class="mb-4"
      name="activityCount"
      label="Activity Count"
      type="number"
      border
      :rounded="'xl'"
      :error="errors.activityCount"
    />
    <BaseInput
      v-model="relationshipCount"
      v-bind="relationshipCountAttrs"
      class="mb-4"
      name="relationshipCount"
      label="Relationship Count"
      type="number"
      border
      :rounded="'xl'"
      :error="errors.relationshipCount"
    />
    <BaseInput
      v-model="tagCount"
      v-bind="tagCountAttrs"
      class="mb-4"
      name="tagCount"
      label="Tag Count"
      type="number"
      border
      :rounded="'xl'"
      :error="errors.tagCount"
    />
    <BaseInput
      v-model="userCount"
      v-bind="userCountAttrs"
      class="mb-4"
      name="userCount"
      label="User Count"
      type="number"
      border
      :rounded="'xl'"
      :error="errors.userCount"
    />
    <BaseButton class="mt-2 bg-blue-500 text-blue-50" :pending="isSubmitting">
      Load Demo
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { demoSchema } from "~/schemas/demo.schema";
import { toTypedSchema } from "@vee-validate/valibot";

const { onResponse, onResponseError } = useLogging();

const validationSchema = toTypedSchema(demoSchema);
const { handleSubmit, isSubmitting, errors, defineField } = useForm({
  validationSchema,
});
const [entityCount, entityCountAttrs] = defineField("entityCount");
const [activityCount, activityCountAttrs] = defineField("activityCount");
const [relationshipCount, relationshipCountAttrs] =
  defineField("relationshipCount");
const [tagCount, tagCountAttrs] = defineField("tagCount");
const [userCount, userCountAttrs] = defineField("userCount");

const onSubmit = handleSubmit(async (body) => {
  await $fetch("/api/data/demo", {
    method: "POST",
    body,
    onResponseError,
    onResponse,
  });
});
</script>
