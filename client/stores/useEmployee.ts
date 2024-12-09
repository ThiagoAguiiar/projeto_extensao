import type { IpVersion } from "zod";
import type { IGetEmployee, IPostEmployee, IPutEmployee } from "~/types/IEmployee.ts";
import handleResponse from "~/utils/response";

export default defineStore("useEmployee", () => {
  const auth = useAuth();

  const addEmployee = ref(false);

  const {
    public: { apiURL },
  } = useRuntimeConfig();

  const getEmployees = async () => {
    try {
      const response = await $fetch<IResponse<IGetEmployee[]>>("admin/funcionarios", {
        method: "GET",
        headers: auth.getHeaders(),
        baseURL: apiURL,
      });

      return response;
    } catch (err: any) {
      console.log(err.response._data.status);
      await handleResponse(err.response._data.status);
      return null;
    }
  };

  const postEmployee = async (user: IPostEmployee) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/funcionarios", {
        method: "POST",
        headers: auth.getHeaders(),
        body: { ...user },
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const deleteEmployee = async (email: string, userId: number) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/funcionarios", {
        method: "DELETE",
        headers: auth.getHeaders(),
        params: { email: email, id: userId },
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const getEmployeeId = async (id: string) => {
    try {
      return await $fetch<IResponse<IGetEmployee>>("admin/funcionarios/getById", {
        method: "GET",
        headers: auth.getHeaders(),
        params: { id },
        baseURL: apiURL,
      });
    } catch (err: any) {
      console.log(err.response._data.status);
      await handleResponse(err.response._data.status);
      return null;
    }
  };

  const putEmployee = async (user: IPutEmployee) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/funcionarios", {
        method: "PUT",
        headers: auth.getHeaders(),
        body: user,
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  return { getEmployees, postEmployee, deleteEmployee, getEmployeeId, addEmployee, putEmployee };
});
