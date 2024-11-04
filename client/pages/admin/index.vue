<template>ADMINISTRATIO</template>

<script lang="ts" setup>
import handleResponse from "~/utils/response";

const { error } = await useAsyncData("", () =>
  $fetch("/admin", {
    method: "GET",
    baseURL: useRuntimeConfig().public.apiURL,
    headers: {
      Authorization: `Bearer ${
        useCookie(useRuntimeConfig().public.authToken).value
      }`,
    },
  })
);

handleResponse(error.value?.statusCode || 200);
</script>
