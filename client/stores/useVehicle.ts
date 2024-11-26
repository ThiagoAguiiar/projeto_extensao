import type { IGetVehicle, IPostVehicle, IPutVehicle } from "~/types/IVehicles";
import handleResponse from "~/utils/response";

export default defineStore("useVehicle", () => {
  const auth = useAuth();

  const addVehicle = ref(false);

  const {
    public: { apiURL },
  } = useRuntimeConfig();

  const getVehicles = async () => {
    try {
      const response = await $fetch<IResponse<IGetVehicle[]>>("admin/veiculos", {
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

  const postVehicle = async (vehicle: IPostVehicle) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/veiculos", {
        method: "POST",
        headers: auth.getHeaders(),
        body: { ...vehicle },
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const deleteVehicle = async (placa: string) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/usuarios", {
        method: "DELETE",
        headers: auth.getHeaders(),
        params: { placa: placa},
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  /*const getUserId = async (id: string) => {
    try {
      return await $fetch<IResponse<IGetUser>>("admin/usuarios/getById", {
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
  };*/

  const putVehicle = async (user: IPutVehicle) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/veiculos", {
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

  return { getVehicles, postVehicle, deleteVehicle, addVehicle, putVehicle };
});
