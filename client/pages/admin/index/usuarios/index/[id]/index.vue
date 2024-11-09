<template>
  <div class="px-5 flex-1">
    <div v-if="usuario && usuario.data" class="space-y-4">
      <div class="px-5">
        <p class="text-sm text-gray-500">Editar informações de</p>
        <h2 class="text-lg">{{ usuario?.data.nome }}</h2>
      </div>

      <UForm :state="usuario.data" @submit="handleSubmit">
        <BaseGroup
          name="nome"
          label="Nome"
          hint="Nome de usuário disponível no sistema"
          required
        >
          <UInput
            v-model="usuario.data.nome"
            :dibabled="loading"
            class="w-[450px] max-[450px]:w-full"
          />
        </BaseGroup>

        <BaseGroup
          name="email"
          label="Email"
          hint="Email de acesso ao sistema"
          required
        >
          <UInput
            v-model="usuario.data.email"
            :dibabled="loading"
            class="w-[450px] max-[450px]:w-full"
          />
        </BaseGroup>

        <BaseGroup
          name="telefone"
          label="Telefone"
          hint="Informação básica para contato"
          required
        >
          <UInput
            v-model="usuario.data.telefone"
            :dibabled="loading"
            v-maska="'(##) #####-####'"
            class="w-[450px] max-[450px]:w-full"
          />
        </BaseGroup>

        <BaseGroup
          name="ativo"
          label="Status"
          hint='Status do usuário. Ele só poderá acessar o sistema na condição de "ativo"'
          required
        >
          <div class="w-[450px] max-[450px]:w-full">
            <UToggle v-model="usuario.data.ativo" />
            <span class="inline-block ml-2.5 text-sm">
              {{ usuario.data.ativo ? "Ativo" : "Inativo" }}
            </span>
          </div>
        </BaseGroup>

        <div class="w-full flex items-center justify-end gap-x-2.5 mt-5">
          <UButton
            label="Cancelar"
            color="red"
            variant="soft"
            type="button"
            @click="confirmExit"
          />

          <UButton
            label="Salvar"
            type="submit"
            color="black"
            :loading="loading"
            :dibabled="loading"
          />
        </div>
      </UForm>
    </div>

    <div class="w-full h-full flex justify-center items-center" v-else>
      <p>Nenhum usuário encontrado =C</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const u = useUser();
const route = useRoute();
const toast = useToast();

const loading = ref(false);

const { data: usuario } = await useAsyncData("getUserId", () => {
  return u.getUserId(route.params.id.toString());
});

const confirmExit = () => {
  const c = confirm("Deseja realmente sair? As alterações não serão salvas");
  if (c) navigateTo("/admin/usuarios");
};

const handleSubmit = async () => {
  try {
    loading.value = true;

    if (usuario.value) {
      const { data, error } = await u.putUser({
        ativo: usuario.value.data.ativo,
        email: usuario.value.data.email,
        nome: usuario.value.data.nome,
        telefone: usuario.value.data.telefone,
        idUsuario: usuario.value.data.idUsuario,
      });

      if (data.value) {
        toast.add({
          title: "Sucesso",
          description: data.value.message,
          color: "green",
        });

        await navigateTo("/admin/usuarios");
        await refreshNuxtData("getUsers");
      }

      if (error.value) {
        toast.add({
          title: "Erro",
          description: error.value.message,
          color: "red",
        });
      }
    }
  } catch (err) {
    console.log(err);
    toast.add({
      title: "Erro",
      description: "Ocorreu um erro ao salvar as informações",
      color: "red",
    });
  } finally {
    loading.value = false;
  }
};
</script>
