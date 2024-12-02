<template>
  <div class="relative">
    <div ref="tagsInput">
      <slot name="label">
        <BaseInputLabel
          v-if="label"
          :tags="props.labelTags"
          :name="label + 'bags-input'"
          :label="label"
          :required="required"
        />
      </slot>
      <div
        class="min-h-10 w-full overflow-hidden rounded-lg border border-zinc-300 bg-white"
        :class="[{ 'rounded-b-none': focused }]"
      >
        <ul class="relative m-2 mb-0 flex flex-wrap">
          <li
            v-for="(item, index) in tags"
            :key="index"
            class="mb-2 mr-2 inline-flex"
          >
            <BaseTagsInputTab
              :tag="item"
              :index="index"
              @remove-tab="removeItem"
            ></BaseTagsInputTab>
          </li>
          <li class="relative mb-2 inline-flex h-6 min-w-32 flex-grow">
            <input
              ref="input"
              v-model="text"
              class="h-full w-full outline-none placeholder:text-zinc-400"
              :placeholder="placeholder"
              @paste="emit('paste', $event)"
              @keydown="handleKeyDown"
            />
          </li>
        </ul>
      </div>
      <div
        v-if="focused"
        class="absolute left-0 z-10 w-full overflow-hidden rounded-md rounded-t-none border border-t-0 bg-white shadow-lg"
        style="top: 100%"
      >
        <div v-if="options">
          <div v-if="loading === true">
            <div class="w-full px-4 py-2 hover:bg-gray-100 focus:bg-gray-100">
              Loading
            </div>
          </div>
          <ul v-else-if="options.length">
            <li v-for="(option, index) in options" :key="option">
              <button
                class="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                @click="select(index)"
                @touchstart="select(index)"
              >
                {{ option }}
              </button>
            </li>
          </ul>
          <div v-else>
            <div class="w-full px-4 py-2 hover:bg-gray-100 focus:bg-gray-100">
              No Results
            </div>
          </div>
        </div>
      </div>
    </div>
    <input ref="other" class="absolute top-0 opacity-0" />
  </div>
</template>

<script setup lang="ts">
const tagsInput = ref<null | HTMLInputElement>(null);
const input = ref<null | HTMLInputElement>(null);
const other = ref<null | HTMLInputElement>(null);
const { focused: focusedWithin } = useFocusWithin(tagsInput);
const { focused: focusedInput } = useFocus(input);

const focused = computed(() => {
  return focusedInput.value || focusedWithin.value;
});

const props = defineProps<{
  label?: string;
  placeholder?: string;
  loading?: boolean;
  tags: string[] | { value: string; icon: string }[];
  required?: boolean;
  labelTags?: string[];
  options?: string[];
}>();
const text = defineModel({ required: true, type: String });

const emit = defineEmits([
  "focus",
  "blur",
  "enter",
  "select",
  "remove",
  "paste",
]);

watch(focused, (newVal) => {
  if (newVal) {
    emit("focus");
  } else {
    emit("blur");
  }
});

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case "Enter": {
      event.preventDefault();
      handleEnter();
      return;
    }
    case "Backspace": {
      if (text.value === "" && props.tags.length) {
        event.preventDefault();
        removeItem(props.tags.length - 1);
      }
      return;
    }
    default:
      return;
  }
};

const select = (index: number) => {
  other.value?.focus();
  emit("select", index);
};

const handleEnter = () => {
  emit("enter");
};

const removeItem = (index: number) => {
  emit("remove", index, input.value);
};
</script>
