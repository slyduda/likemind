<template>
  <div class="flex h-full w-full items-center justify-center">
    <AppContent>
      <div class="mb-4 flex w-full flex-col items-center justify-center">
        <h1 class="archivo text-2xl font-semibold">Login</h1>
      </div>
      <BaseInput
        v-model="body.email"
        class="mb-4"
        name="email"
        label="Email"
        type="email"
        required
        placeholder="example@email.com"
        border
        :rounded="'xl'"
      />
      <BaseInput
        v-model="body.password"
        class="mb-4"
        name="password"
        label="Password"
        type="password"
        required
        placeholder="password"
        border
        :rounded="'xl'"
      />
      <div class="flex flex-col items-center justify-center">
        <BaseButton
          :pending="pending"
          :disabled="disabled"
          class="mt-2 w-full bg-blue-500 text-indigo-50"
          @click="makeRequests"
        >
          Login
        </BaseButton>
        <NuxtLink
          to="/signup"
          class="archivo mt-4 font-bold text-blue-500 underline"
          >Signup</NuxtLink
        >
      </div>
    </AppContent>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "access",
});

const body = reactive({
  email: "",
  password: "",
});

const pending = ref(false);
const disabled = computed(() => !body.email || !body.password);

const makeRequests = async () => {
  if (disabled.value) return;
  pending.value = true;

  // Call the login and grab the token
  await postLogin();

  pending.value = false;
};

const postLogin = async () => {
  await $fetch("/api/login", {
    method: "POST",
    body,
  })
    .then(() => {})
    .catch(() => {});
};
</script>
