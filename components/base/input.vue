<template>
  <div class="archivo">
    <!-- The Label at the top of the input -->
    <slot name="label">
      <BaseInputLabel :name="name" :label="label" :required="required" />
    </slot>

    <!-- Input Wrapper -->
    <div
      class="w-full border-solid bg-white focus:ring-4 dark:bg-zinc-950"
      :class="[
        classes,
        shadowComputed,
        roundedComputed,
        borderComputed,
        validColorComputed,
        sizeComputed,
        { 'bg-zinc-300 text-zinc-500': disabled },
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
        class="h-full w-full appearance-none bg-transparent px-3 py-2 text-zinc-950 outline-none placeholder:text-zinc-400 disabled:text-zinc-500 dark:text-stone-50"
        :class="[roundedComputed]"
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
  size?: "sm" | "md";
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
  size: "md",
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

const shadowComputed = computed(() =>
  props.shadow === "xl"
    ? "shadow-xl"
    : props.shadow === "lg"
      ? "shadow-lg"
      : props.shadow === "sm"
        ? "shadow-sm"
        : props.shadow
          ? "shadow"
          : "",
);

const roundedComputed = computed(() =>
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
            : "",
);

const borderComputed = computed(() =>
  props.border === 2
    ? "border-2"
    : props.border === 3
      ? "border-3"
      : props.border === 4
        ? "border-4"
        : props.border
          ? "border"
          : "",
);

const sizeComputed = computed(() =>
  props.height ? "" : props.size === "md" ? "h-12" : "h-10",
);

const validColorComputed = computed(() =>
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
