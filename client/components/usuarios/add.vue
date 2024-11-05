<template>
  <UModal
    v-model="isOpen"
    @update:model-value="emits('update:modelValue', isOpen)"
  >
    <UCard>
      <template #header>
        <h2 class="text">Adicionar novo usuário</h2>
        <p class="text-[13px] font-light">Preencha os campos corretamente</p>
      </template>

      <UForm :state="models" @submit="handleSubmit" class="space-y-3">
        <UFormGroup name="nome" label="Nome" required>
          <UInput v-model="models.nome" :disabled="models.loading" />
        </UFormGroup>

        <UFormGroup name="telefone" label="Telefone" required>
          <UInput
            v-model="models.telefone"
            :disabled="models.loading"
            v-maska="'(##) #####-####'"
          />
        </UFormGroup>

        <UFormGroup name="email" label="Email" required>
          <UInput v-model="models.email" :disabled="models.loading" />
        </UFormGroup>

        <UFormGroup name="senha" label="Senha de acesso temporária" required>
          <UInput v-model="models.senha" :disabled="models.loading" />
        </UFormGroup>

        <UFormGroup name="ativo" label="Status do cadastro" required>
          <UToggle v-model="models.ativo" :disabled="models.loading" />
        </UFormGroup>

        <div class="flex justify-end space-x-2">
          <UButton
            color="red"
            variant="ghost"
            type="button"
            @click="emits('update:modelValue', false)"
            :disabled="models.loading"
          >
            Cancelar
          </UButton>

          <UButton
            color="black"
            type="submit"
            :loading="models.loading"
            :disabled="models.loading"
          >
            Salvar
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const isOpen = ref(false);
isOpen.value = props.modelValue;

const user = useUser();
const toast = useToast();

interface IModels extends IPostUser {
  loading: boolean;
}

const models = reactive<IModels>({
  loading: false,
  nome: "",
  email: "",
  senha: "",
  ativo: false,
  telefone: "",
});

const handleSubmit = async () => {
  try {
    models.loading = true;

    const { data, error } = await user.postUser(models);

    if (error.value) {
      toast.add({
        title: "Atenção!",
        description: error.value.message,
        color: "yellow",
      });
    }

    if (data.value) {
      toast.add({
        title: "Sucesso!",
        description: data.value.message,
        color: "green",
      });

      emits("update:modelValue", false);
            
      await refreshNuxtData("getUsers");
    }
  } catch (err: any) {
    toast.add({
      title: "Erro!",
      description:
        "Ocorreu um erro. Tente novamente ou entre em contato com o administrador",
      color: "red",
    });
  } finally {
    models.loading = false;
  }
};

watch(
  () => props.modelValue,
  (value) => (isOpen.value = value)
);
</script>
