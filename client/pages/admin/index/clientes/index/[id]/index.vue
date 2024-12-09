<template>
  <div class="px-5 flex-1">
    <div v-if="cliente && cliente.data" class="space-y-4">
      <div class="px-5">
        <p class="text-sm text-gray-500">Editar informações de</p>
        <h2 class="text-lg">{{ cliente?.data.nome }}</h2>
      </div>

      <UForm :state="cliente.data" @submit="handleSubmit">
        <BaseGroup
          name="nome"
          label="Nome"
          hint="Nome de usuário disponível no sistema"
          required
        >
          <UInput
            v-model="cliente.data.nome"
            :disabeld="loading"
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
            v-model="cliente.data.email"
            :disabeld="loading"
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
            v-model="cliente.data.telefone"
            :disabeld="loading"
            v-maska="'(##) #####-####'"
            placeholder="(19) 1234-5678"
            class="w-[450px] max-[450px]:w-full"
          />
        </BaseGroup>

        <BaseGroup
          name="Endereco"
          label="Endereço"
          hint="Informação de contato com o cliente em caso de leva e traz"
        >
          <UInput
            v-model="cliente.data.endereco"
            :disabled="loading"
            class="w-[450px] max-[450px]:w-full"
          >
          </UInput>
        </BaseGroup>

        <!-- <BaseGroup
          name="ativo"
          label="Status"
          hint='Status do usuário. Ele só poderá acessar o sistema na condição de "ativo"'
          required
        >
          <div class="w-[450px] max-[450px]:w-full">
            <UToggle v-model="cliente.data.ativo" />
            <span class="inline-block ml-2.5 text-sm">
              {{ cliente.data.ativo ? "Ativo" : "Inativo" }}
            </span>
          </div>
        </BaseGroup> -->

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
            :disabeld="loading"
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
import { _size } from '#tailwind-config/theme';

const u = useUser()
const route = useRoute();
const toast = useToast();

const loading = ref(false);

const { data: cliente } = await useAsyncData("getUserId", () => {
  return u.getUserId(route.params.id.toString());
});

const confirmExit = () => {
  const c = confirm("Deseja realmente sair? As alterações não serão salvas");
  if (c) navigateTo("/admin/clientes");
};

const handleSubmit = async () => {
  try {
    loading.value = true;

    //console.log(cliente.value, cliente.value?.data)
    if (cliente.value && cliente.value.data) {
      const { data, error } = await u.putUser({
        //ativo: cliente.value.data.ativo,
        email: cliente.value.data.email,
        nome: cliente.value.data.nome,
        telefone: cliente.value.data.telefone,
        idCliente: cliente.value.data.idCliente,
        endereco: cliente.value.data.endereco
      });

      if (data.value) {
        toast.add({
          title: "Sucesso!",
          description: data.value.message,
          color: "green",
        });

        await navigateTo("/admin/clientes");
        await refreshNuxtData("getClients");
      }

      if (error.value) {
        toast.add({
          title: "Atenção!",
          description: error.value.message,
          color: "yellow",
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
