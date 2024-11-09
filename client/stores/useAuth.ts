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
      handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const logout = () => {
    const cookie = useCookie(runtime.public.authToken);

    cookie.value = "";
    navigateTo("/auth/login");
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
