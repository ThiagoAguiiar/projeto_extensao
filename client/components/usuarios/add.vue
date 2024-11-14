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

      <UsuariosForm
        v-model="models"
        :schema="schema"
        :loading="models.loading"
        @submit="handleSubmit"
        @close="closeModal"
      />
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { z } from "zod";

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
  ativo: true,
  telefone: "",
});

const schema = z.object({
  nome: z.string().trim().min(3, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().trim().min(1, "Senha é obrigatória"),
  ativo: z.boolean(),
  telefone: z.string().trim().min(15, "Telefone é obrigatório"),
});

const clearData = () => {
  models.nome = "";
  models.email = "";
  models.senha = "";
  models.ativo = true;
  models.telefone = "";
};

const closeModal = () => {
  emits("update:modelValue", false);
  clearData();
};

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
      clearData();

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
