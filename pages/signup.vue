<template>
  <ClientOnly>
    <div class="flex h-full w-full items-center justify-center">
      <AppContent>
        <div class="mb-4 flex w-full flex-col items-center justify-center">
          <h1 class="archivo text-2xl font-semibold">Signup</h1>
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
          v-model="body.handle"
          class="mb-4"
          name="handle"
          label="Handle"
          required
          placeholder="handle"
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
            Signup
          </BaseButton>
          <NuxtLink
            to="/login"
            class="archivo mt-4 font-bold text-blue-500 underline"
          >
            Login
          </NuxtLink>
        </div>
      </AppContent>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "access",
});

const body = reactive({
  email: "",
  handle: "",
  password: "",
});

const { onResponse, onRequestError } = useLogging();
const router = useRouter();

const pending = ref(false);
const disabled = computed(() => !body.email || !body.password || !body.handle);

const makeRequests = async () => {
  pending.value = true;
  await postUsersSignup();
  pending.value = false;
};

const postUsersSignup = async () => {
  await $fetch("/api/users", {
    method: "POST",
    body,
    onRequestError,
    onResponse,
  })
    .then(() => {
      router.push("/login");
    })
    .catch(() => {});
};
</script>
