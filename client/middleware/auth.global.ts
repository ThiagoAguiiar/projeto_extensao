export default defineNuxtRouteMiddleware(async (to, from) => {
  const runtime = useRuntimeConfig();
  const token = useCookie(runtime.public.authToken).value;

  if (token && to.path.includes("/admin") && to.path !== "/admin") {
    return;
  }

  if (!token && to.path.includes("/admin") && to.path !== "/auth/login") {
    return await navigateTo("/auth/login");
  }

  if (token && to.path === "/auth/login") {
    return await navigateTo("/admin");
  }
});
