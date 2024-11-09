import handleResponse from "~/utils/response";

export default defineStore("useUser", () => {
  const auth = useAuth();

  const addUser = ref(false);

  const {
    public: { apiURL },
  } = useRuntimeConfig();

  const getUsers = async () => {
    try {
      return await $fetch<IResponse<IGetUser[]>>("admin/usuarios", {
        method: "GET",
        headers: auth.getHeaders(),
        baseURL: apiURL,
      });
    } catch (err: any) {
      console.log(err.response._data.status);

      handleResponse(err.response._data.status);
      return null;
    }
  };

  const postUser = async (user: IPostUser) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/usuarios", {
        method: "POST",
        headers: auth.getHeaders(),
        body: user,
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const deleteUser = async (email: string, userId: number) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/usuarios", {
        method: "DELETE",
        headers: auth.getHeaders(),
        params: { email: email, id: userId },
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const getUserId = async (id: string) => {
    try {
      return await $fetch<IResponse<IGetUser>>("admin/usuarios/getById", {
        method: "GET",
        headers: auth.getHeaders(),
        params: { id },
        baseURL: apiURL,
      });
    } catch (err: any) {
      console.log(err.response._data.status);
      handleResponse(err.response._data.status);
      return null;
    }
  };

  return { getUsers, postUser, deleteUser, getUserId, addUser };
});
