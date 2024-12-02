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
        class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-mono text-lg font-extrabold text-zinc-500"
        @click="logout"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300"
        >
          <div class="text-sm">{{ account.handle[0] }}</div>
        </div>
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
  scrollToTop: false,
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
    onResponseError: (error) => onResponseError(error),
    onResponse: () => {
      // onResponse(request);
      router.push("/login");
    },
  });
};
</script>
