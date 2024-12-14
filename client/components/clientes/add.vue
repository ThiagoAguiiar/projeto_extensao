<template>
  <UModal
    v-model="isOpen"
    @update:model-value="emits('update:modelValue', isOpen)"
  >
    <UCard>
      <template #header>
        <h2 class="text">Adicionar novo cliente</h2>
        <p class="text-[13px] font-light">Preencha os campos corretamente</p>
      </template>

      <ClientesForm
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

interface IModels extends IPostClient {
  loading: boolean;
}

const models = reactive<IModels>({
  loading: false,
  nome: "",
  email: "",
  endereco: "",
  telefone: ""
});

const schema = z.object({
  nome: z.string().trim().min(3, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().trim().min(15, "Telefone é obrigatório"),
  endereco: z.string().trim().min(5, "Campo opcional")
});

const clearData = () => {
  models.nome = "";
  models.email = "";
  models.telefone = "";
  models.endereco = ""
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
