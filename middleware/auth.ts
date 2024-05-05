import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server since it doesn't have access to state
  if (import.meta.server) {
    return;
  }

  const userStore = useUserStore();

  try {
    const response = await $fetch("/api/users");
    userStore.account = response;
  } catch (error) {
    userStore.account = null;
    return navigateTo(`/login?redirect=${to.path}`);
  }
});
