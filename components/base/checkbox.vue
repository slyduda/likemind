<template>
  <div
    class="checkbox relative mb-2 last:mb-0"
    :class="[{ 'opacity-50': disabled }, { 'mr-3 inline-flex': inline }]"
  >
    <input
      :id="cbId"
      v-model="model"
      class="cursor-pointer"
      type="checkbox"
      :disabled="disabled"
    />
    <label :for="cbId" class="cursor-pointer">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: Boolean });
const cbId = ref(randomId(12));

defineProps<{
  disabled?: boolean;
  inline?: boolean;
}>();
</script>

<style>
input[type="checkbox"] {
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.checkbox label:before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: -5px;
  @apply border-2;
  @apply border-gray-300;
  @apply box-border;
  @apply mr-1;
  @apply rounded-lg;
}

.checkbox input:hover:enabled + label:before {
  @apply border-blue-500;
}
/*
.checkbox input:focus + label:before {
  @apply ring-2;
}*/

.checkbox input:checked + label:before {
  @apply border-blue-500;
  @apply bg-blue-500;
}

.checkbox label:after {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  position: absolute;
  margin-left: 7px;
  margin-top: 7px;
  top: 0px;
  left: 0px;
  content: "";
  display: inline-block;
  vertical-align: -7px;
  width: 10px;
  height: 10px;
}
</style>
