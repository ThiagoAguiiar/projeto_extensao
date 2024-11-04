export default defineStore("useAuth", () => {
  const runtime = useRuntimeConfig();

  const login = async (email: string, password: string) => {
    const error = ref<IResponse | null>(null);
    const data = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse<ILogin>>("/login", {
        method: "POST",
        baseURL: runtime.public.apiURL,
        body: { email: email, senha: password },
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
    }

    return { data, error };
  };

  const logout = () => {
    const cookie = useCookie(runtime.public.authToken);

    cookie.value = "";
    navigateTo("/auth/login");
  };

  return { login, logout };
});
