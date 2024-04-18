<template>
  <div
    class="archivo mb-4 ml-4 mr-4 inline-block rounded-xl py-2 pl-3 pr-2 text-white"
    :class="[
      { 'bg-rose-500': message.type === 'ERROR' || message.type === 'FAILURE' },
      { 'bg-emerald-500': message.type === 'SUCCESS' },
    ]"
  >
    <div class="flex text-sm">
      <div
        v-if="message.type === 'ERROR' || message.type === 'FAILURE'"
        class="flex items-center"
      >
        {{ props.message.status ?? "418" }}:
        {{
          props.message.payload?.error?.message ??
          props.message.payload?.error ??
          props.message.payload?.message ??
          props.message.payload ??
          "I'm a little teapot"
        }}
      </div>
      <div v-else class="flex items-center">
        {{ props.message.status }}: Success!
      </div>
      <button
        class="ml-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
        :class="[
          {
            'hover:bg-rose-400':
              message.type === 'ERROR' || message.type === 'FAILURE',
          },
          { 'hover:bg-emerald-400': message.type === 'SUCCESS' },
        ]"
        @click="acknowledge"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();

const props = defineProps<{
  message: Message;
}>();

const acknowledge = () => {
  mainStore.acknowledgements[props.message.id] = acknowledgementCreator(
    props.message,
    "MANUAL",
  );
};
</script>
