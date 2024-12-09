<template>
  <div class="px-5 flex-1">
    <div v-if="funcionario && funcionario.data" class="space-y-4">
      <div class="px-5">
        <p class="text-sm text-gray-600">Editar informações de</p>
        <h2 class="text-lg">{{ funcionario?.data.nome }}</h2>
      </div>

      <UForm :state="funcionario.data" @submit="handleSubmit">
        <BaseGroup name="nome" label="Nome" hint="Nome de usuário disponível no sistema" required>
          <UInput v-model="funcionario.data.nome" :disabled="loading" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="email" label="Email" hint="Email do usuário" required>
          <UInput v-model="funcionario.data.email" :disabled="loading" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="telefone" label="Telefone" hint="Informação básica para contato" required>
          <UInput v-model="funcionario.data.telefone" :disabled="loading" v-maska="'(##) #####-####'"
            class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="ativo" label="Status"
          hint='Status do usuário. Ele só poderá acessar o sistema na condição de "ativo"' required>
          <div class="w-[450px] max-[450px]:w-full">
            <UToggle v-model="funcionario.data.ativo" />
            <span class="inline-block ml-2.5 text-sm">
              {{ funcionario.data.ativo ? "Ativo" : "Inativo" }}
            </span>
          </div>
        </BaseGroup>

        <div class="w-full flex items-center justify-end gap-x-2.5 mt-5">
          <UButton label="Cancelar" color="red" variant="soft" type="button" @click="confirmExit" />

          <UButton label="Salvar" type="submit" color="black" :loading="loading" :disabled="loading" />
        </div>
      </UForm>
    </div>

    <div class="w-full h-full flex justify-center items-center" v-else>
      <p>Nenhum usuário encontrado =C</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const u = useEmployee();
const route = useRoute();
const toast = useToast();

const loading = ref(false);

const { data: funcionario } = await useAsyncData("getEmployeeId", () => {
    return u.getEmployeeId(route.params.id.toString());
});

const confirmExit = () => {
  const c = confirm("Deseja realmente sair? As alterações não serão salvas");
  if (c) navigateTo("/admin/funcionarios");
};

const handleSubmit = async () => {
  try {
    loading.value = true;

    if (funcionario.value) {
      const { data, error } = await u.putEmployee({
        ativo: funcionario.value.data.ativo,
        email: funcionario.value.data.email,
        nome: funcionario.value.data.nome,
        telefone: funcionario.value.data.telefone,
        idFuncionario: funcionario.value.data.idFuncionario,
      });

      if (data.value) {
        toast.add({
          title: "Sucesso!",
          description: data.value.message,
          color: "green",
        });

        await navigateTo("/admin/funcionarios");
        await refreshNuxtData("getEmployees");
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
