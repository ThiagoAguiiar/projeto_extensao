<template>
  <UForm
    @submit="handleSubmit"
    :schema="schema"
    :state="models"
    class="w-full p-3 space-y-2.5"
  >
    <div>
      <h1 class="text-xl font-bold">Login</h1>
      <p class="text-sm">Acessar sua conta para continuar</p>
    </div>

    <UFormGroup name="email" label="Email">
      <UInput v-model.trim="models.email" type="email" />
    </UFormGroup>

    <UFormGroup name="senha" label="Senha">
      <UInput v-model.trim="models.senha" type="password" />
    </UFormGroup>

    <div class="flex justify-end">
      <NuxtLink class="text-[13px] underline" to="/auth/forgot">
        Esqueci minha senha
      </NuxtLink>
    </div>

    <UButton
      :loading="models.loading"
      :disabled="models.loading"
      class="w-full justify-center"
      type="submit"
      color="black"
      label="Entrar"
      size="md"
    />

    <UAlert v-if="models.error" color="red" variant="soft">
      <template #description>
        <p class="text-[13px] leading-[18px]">{{ models.error.message }}</p>
      </template>
    </UAlert>
  </UForm>
</template>

<script lang="ts" setup>
import { z } from "zod";

definePageMeta({ layout: "auth" });

const auth = useAuth();
const runtime = useRuntimeConfig();

interface IModels {
  email: string;
  senha: string;
  loading: boolean;
  error: IResponse | null;
}

const models = reactive<IModels>({
  email: "",
  senha: "",
  loading: false,
  error: null,
});

const schema = z.object({
  email: z.string().trim().email("Preencha o campo corretamente"),
  senha: z.string().min(1, "Preencha o campo corretamente"),
});

const handleSubmit = async () => {
  models.loading = true;

  try {
    const { data, error } = await auth.login(models.email, models.senha);

    if (data.value) {
      const cookies = useCookie(runtime.public.authToken, {
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      });

      cookies.value = data.value.data.token;
      await navigateTo("/admin");
    }

    if (error.value) models.error = error.value;
  } catch (err: any) {
    models.error = {
      message: Status.INTERNAL_ERROR,
      data: null,
      status: 400,
    };
  } finally {
    models.loading = false;
  }
};

watch(
  () => [models.email, models.senha],
  () => (models.error = null)
);
</script>
