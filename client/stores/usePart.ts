import type { IGetPart, IPostPart, IPutPart } from "~/types/IParts";
import handleResponse from "~/utils/response";

export default defineStore("usePart", () => {
  const auth = useAuth();

  const addPart = ref(false);

  const {
    public: { apiURL },
  } = useRuntimeConfig();

  const getParts = async () => {
    try {
      const response = await $fetch<IResponse<IGetPart[]>>("admin/pecas", {
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

  const postPart = async (part: IPostPart) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/pecas", {
        method: "POST",
        headers: auth.getHeaders(),
        body: { ...part },
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const deletePart = async (idPeca: number) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/pecas", {
        method: "DELETE",
        headers: auth.getHeaders(),
        params: { idPeca: idPeca},
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  const getPartId = async (idPeca: string) => {
    try {
      return await $fetch<IResponse<IGetPart>>("admin/pecas/getById", {
        method: "GET",
        headers: auth.getHeaders(),
        params: { idPeca },
        baseURL: apiURL,
      });
    } catch (err: any) {
      console.log(err.response._data.status);
      await handleResponse(err.response._data.status);
      return null;
    }
  };

  const putPart = async (part: IPutPart) => {
    const data = ref<IResponse | null>(null);
    const error = ref<IResponse | null>(null);

    try {
      const response = await $fetch<IResponse>("/admin/pecas", {
        method: "PUT",
        headers: auth.getHeaders(),
        body: part,
        baseURL: apiURL,
      });

      data.value = response;
    } catch (err: any) {
      error.value = err.response._data;
      await handleResponse(err.response._data.status);
    }

    return { data, error };
  };

  return { getParts, getPartId, postPart, deletePart, addPart, putPart };
});
