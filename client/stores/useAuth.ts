import { jwtDecode } from "jwt-decode";
import handleResponse from "~/utils/response";

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
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const logout = async () => {
    const cookie = useCookie(runtime.public.authToken);
    const toast = useToast();

    try {
      const res = await $fetch<IResponse>("/logout", {
        method: "GET",
        baseURL: runtime.public.apiURL,
        params: { id: decodeToken()?.id },
      });

      toast.add({
        title: "Até mais",
        description: res.message,
        color: "green",
      });
    } catch (err) {
      // Handle Error
    }

    cookie.value = "";
    await navigateTo("/auth/login");
  };

  const getHeaders = () => {
    const cookie = useCookie(runtime.public.authToken).value;

    if (cookie) {
      return new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      });
    }

    return new Headers({
      "Content-Type": "application/json",
    });
  };

  const decodeToken = () => {
    const cookie = useCookie(runtime.public.authToken).value;

    if (cookie) {
      const token = useCookie(runtime.public.authToken).value;

      if (token) {
        const decoded = jwtDecode<IDecodeToken>(token);
        return decoded;
      }
    }

    return null;
  };

  return { login, logout, getHeaders, decodeToken };
});
