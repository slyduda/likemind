<template>
  <div
    class="checkbox relative mb-2 last:mb-0"
    :class="[
      { 'opacity-50': disabled },
      { 'inline-flex': inline },
      size === 'sm' ? 'checkbox-sm text-sm' : 'checkbox-base text-base',
    ]"
  >
    <input
      :id="name"
      v-model="model"
      class="cursor-pointer"
      type="checkbox"
      :disabled="disabled"
    />
    <label
      :for="name"
      class="flex cursor-pointer items-center gap-1.5"
      :class="[
        { checked: model },
        position === 'left' ? 'flex-row-reverse' : 'flex-row',
      ]"
    >
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel({ type: Boolean });

withDefaults(
  defineProps<{
    disabled?: boolean;
    inline?: boolean;
    size?: "sm" | "base"; // New size prop
    position?: "left" | "right"; // New label position prop
    name: string;
  }>(),
  {
    size: "base", // Default to 'base'
    position: "right", // Default to 'right'
  },
);

const emit = defineEmits(["toggled"]);

watch(model, (val) => {
  emit("toggled", val);
});
</script>

<style>
/* Checkbox Input: Hidden */
input[type="checkbox"] {
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

/* Base Size Checkbox */
.checkbox-base label:before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align: -5px;
  @apply border;
  @apply border-gray-300;
  @apply box-border;
  @apply rounded-lg;
  @apply bg-white;
  /* Added white background */
}

.checkbox-base input:hover:enabled + label:before {
  @apply border-blue-500;
}

.checkbox-base input:checked + label:before {
  @apply border-blue-500;
  @apply bg-blue-500;
}

/* Checkmark for Base Size */
.checkbox-base label.checked:after {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  position: absolute;
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 7px;
}

/* Right Position (Default) */
.flex-row .checkbox-base label.checked:after {
  margin-left: 7px;
  margin-right: unset;
  top: 7px;
  left: 0px;
  right: unset;
  margin-left: 0px !important;
  margin-right: 6px;
}

/* Left Position */
.flex-row-reverse .checkbox-base label.checked:after {
  margin-right: 7px;
  margin-left: unset;
  top: 7px;
  right: 0px;
  left: unset;
}

/* Small Size Checkbox */
.checkbox-sm label:before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: -4px;
  @apply border;
  @apply border-gray-300;
  @apply box-border;
  @apply rounded-lg;
  @apply bg-white;

  /* Added white background */
}

.checkbox-sm input:hover:enabled + label:before {
  @apply border-blue-500;
}

.checkbox-sm input:checked + label:before {
  @apply border-blue-500;
  @apply bg-blue-500;
}

/* Checkmark for Small Size */
.checkbox-sm label.checked:after {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E");
  position: absolute;
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 6px;
}

/* Right Position for Small Size */
.flex-row .checkbox-sm label.checked:after {
  margin-left: 6px;
  margin-right: unset;
  top: 6.5px;
  left: 0px;
  right: unset;
}

/* Left Position for Small Size */
.flex-row-reverse .checkbox-sm label.checked:after {
  margin-right: 6px;
  margin-left: unset;
  top: 6.5px;
  right: 5px;
  left: unset;
}
</style>
