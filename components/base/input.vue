<script setup lang="ts">
enum Validations {
  INVALID = "INVALID",
  VALID = "VALID",
}

interface Props {
  valid?: Validations | null | boolean;
  required?: boolean;
  type?: string;
  name: string;
  label?: string;
  grow?: boolean;
  error?: string | string[];
  shadow?: boolean | "sm" | "md" | "lg" | "xl";
  border?: boolean | number;
  rounded?: boolean | "sm" | "md" | "lg" | "xl" | "full";
  height?: number | null; // If not null is an area
  tooltip?: string;
  placeholder?: string;
  characters?: {
    max: number | undefined;
    min: number | undefined;
  } | null;
  classes?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  valid: null,
  required: false,
  type: undefined,
  name: "",
  label: "",
  grow: false,
  error: "",
  shadow: false,
  border: false,
  rounded: false,
  height: null,
  tooltip: "",
  placeholder: "",
  characters: null,
  classes: "",
  disabled: false,
});

const shadow =
  props.shadow === "xl"
    ? "shadow-xl"
    : props.shadow === "lg"
      ? "shadow-lg"
      : props.shadow === "sm"
        ? "shadow-sm"
        : props.shadow
          ? "shadow"
          : "";

const rounded =
  props.rounded === "full"
    ? "rounded-full"
    : props.rounded === "xl"
      ? "rounded-xl"
      : props.rounded === "lg"
        ? "rounded-lg"
        : props.rounded === "sm"
          ? "rounded-sm"
          : props.rounded
            ? "rounded"
            : "";

const border =
  props.border === 2
    ? "border-2"
    : props.border === 3
      ? "border-3"
      : props.border === 4
        ? "border-4"
        : props.border
          ? "border"
          : "";

const validColor = computed(() =>
  props.valid === Validations.VALID || props.valid === true
    ? "text-green-500 border-green-500"
    : props.valid === Validations.INVALID || props.valid === false
      ? "text-red-500 border-red-500"
      : "border-zinc-300 dark:border-stone-700",
);

const model = defineModel({ type: String });

const emit = defineEmits(["focus", "blur"]);
const focus = () => emit("focus", true);
const blur = () => emit("blur", true);
</script>

<template>
  <div class="archivo">
    <!-- The Label at the top of the input -->
    <slot name="label">
      <BaseInputLabel :name="name" :label="label" :required="required" />
    </slot>

    <!-- Input Wrapper -->
    <div
      class="w-full border-solid bg-white focus:ring-4 dark:bg-stone-950"
      :class="[
        { 'h-12': !height },
        classes,
        shadow,
        rounded,
        border,
        validColor,
        { 'bg-zinc-500 text-zinc-500': disabled },
        { 'hover:border-blue-500': valid === null },
      ]"
    >
      <!-- :is="height ? 'textarea' : 'input'"
         -->
      <input
        :id="name"
        v-model="model"
        :name="name"
        :rows="height ? height.toString() : null"
        :type="type"
        :disabled="disabled"
        :aria-disabled="disabled"
        :aria-required="required"
        :aria-labelledby="name + 'Label'"
        :aria-describedby="name + 'Description'"
        :aria-invalid="valid === Validations.INVALID || true"
        class="h-full w-full appearance-none bg-transparent px-3 py-2 text-zinc-950 outline-none placeholder:text-zinc-700 dark:text-stone-50"
        :class="[rounded]"
        :placeholder="placeholder"
        @focus="focus"
        @blur="blur"
      />
    </div>
    <!-- Help Block for displaying error messages -->
    <slot name="help">
      <div
        class="flex w-full justify-between"
        :class="[{ 'flex-row-reverse': characters }]"
      >
        <div
          v-if="error"
          :id="name + 'Description'"
          class="mt-1 text-sm text-red-500"
        >
          {{ error }}
        </div>
      </div>
    </slot>
  </div>
</template>
