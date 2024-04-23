import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
  // Skip middleware on server since it doesn't have access to state
  if (import.meta.server) {
    return;
  }

  const userStore = useUserStore();
  const { onRequestError, onResponseError } = useLogging();

  try {
    const response = await $fetch("/api/users", {
      onRequestError,
      onResponseError,
    });
    userStore.account = response;
  } catch (error) {
    userStore.account = null;
    return navigateTo("/login");
  }
});
