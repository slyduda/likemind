<template>
  <div
    v-if="formStore.form"
    class="bg-zinc-200 dark:bg-stone-950"
    :class="[{ 'w-1/3': !large }, { 'w-1/2': large }]"
  >
    <div class="h-full w-full p-2 pl-0">
      <div
        class="h-full overflow-auto rounded-xl bg-zinc-100 px-4 dark:bg-stone-900"
      >
        <div class="flex h-full w-full flex-col">
          <AppSidebarHeader :title="`New`" @toggle="large = !large">
          </AppSidebarHeader>
          <div>
            <FormActivity v-if="formStore.form === 'activity'"></FormActivity>
            <FormRelationship
              v-if="formStore.form === 'relationship'"
            ></FormRelationship>
            <FormInvolvement
              v-if="formStore.form === 'involvement'"
            ></FormInvolvement>
            <FormEntity v-if="formStore.form === 'entity'"></FormEntity>
            <FormReviewActivity
              v-if="formStore.form === 'activity-review'"
            ></FormReviewActivity>
            <FormReviewInvolvement
              v-if="formStore.form === 'involvement-review'"
            ></FormReviewInvolvement>
            <FormReviewRelationship
              v-if="formStore.form === 'relationship-review'"
            ></FormReviewRelationship>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const large = ref(false);

const formStore = useFormStore();

watch(
  () => formStore.form,
  (val) => {
    console.log(val);
  },
);
</script>
