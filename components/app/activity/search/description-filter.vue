<template>
  <div class="mb-4">
    <BaseInput
      v-model="input"
      label="Description"
      type="default"
      name="description"
      border
      size="sm"
      rounded="lg"
      placeholder="search by description..."
    >
    </BaseInput>
  </div>
</template>

<script lang="ts" setup>
const query = useState<{
  tags: string[];
  entities: string[];
  description: string;
}>("query");

const input = ref(query.value.description);

watch(input, (val) => {
  query.value = {
    ...query.value,
    description: val,
  };
});
</script>
