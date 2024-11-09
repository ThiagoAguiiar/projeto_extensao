<template>
  <div class="px-5 flex-1">
    <div v-if="usuario && usuario.data" class="space-y-4">
      <div class="px-5">
        <p class="text-sm text-gray-500">Editar informações de</p>
        <h2 class="text-lg">{{ usuario?.data.nome }}</h2>
      </div>

      <UForm :state="usuario.data">
        <BaseGroup
          name="nome"
          label="Nome"
          hint="Nome de usuário disponível no sistema"
          required
        >
          <UInput
            v-model="usuario.data.nome"
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
            @click="confirmExit"
          />
          <UButton label="Salvar" color="black" />
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

const { data: usuario } = await useAsyncData("getUserId", () => {
  return u.getUserId(route.params.id.toString());
});

const confirmExit = () => {
  const c = confirm("Deseja realmente sair? As alterações não serão salvas");
  if (c) navigateTo("/admin/usuarios");
};

const handleSubmit = () => {
  try {
  } catch (err) {
  } finally {
  }
};
</script>
