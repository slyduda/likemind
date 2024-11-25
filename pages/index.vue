<template>
  <div>
    <AppHeader hide-path>
      <template #title>
        <h1 class="archivo whitespace-nowrap text-4xl font-extrabold">
          likemind
        </h1>
      </template>
      <button
        v-if="account"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 font-mono text-lg font-extrabold text-zinc-500"
        @click="logout"
      >
        <div class="h-10 w-10 scale-75 rounded-full bg-zinc-300"></div>
        <div class="absolute">{{ account.handle[0] }}</div>
      </button>
    </AppHeader>
    <ContentDoc class="prose m-auto w-full"></ContentDoc>
    <div class="mb-20"></div>
  </div>
</template>

<script setup lang="ts">
import { useLogging } from "#imports";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const { onResponseError } = useLogging();
const router = useRouter();

const { account } = userStore;

definePageMeta({
  middleware: "soft-auth",
});

useSeoMeta({
  title: "likemind",
  ogTitle: "likemind",
  description:
    "likemind is an app that maps organizational relationships in an effort to increase accountability.",
  ogDescription:
    "likemind is an app that maps organizational relationships in an effort to increase accountability.",
  ogImage: "/likemind-banner.png",
  twitterCard: "summary_large_image",
});

const logout = async () => {
  await $fetch("/api/logout", {
    method: "POST",
    onResponseError,
    onResponse: () => {
      // onResponse(request);
      router.push("/login");
    },
  });
};
</script>
