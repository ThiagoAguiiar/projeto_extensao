<template>
  <UModal
    v-model="isOpen"
    @update:model-value="emits('update:modelValue', isOpen)"
  >
    <UCard>
      <template #header>
        <h2 class="text">Cadastrar uma nova peça no estoque</h2>
        <p class="text-[13px] font-light">Preencha os campos corretamente</p>
      </template>

      <PecasForm
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

const part = usePart();
const toast = useToast();

interface IModels extends IPostPart {
  loading: boolean;
}

const models = reactive<IModels>({
  loading: false,
  nome: "",
  quantidade: 0,
  valor: 0.0
});

const schema = z.object({
  nome: z.string().trim().min(3, "Nome da peça é necessário para sua identificação."),
  quantidade: z.number().min(2, "Quantidade é um campo obrigatório."),
  valor: z.number().min(2, "Valor da unitário da peça é um campo obrigatório.")
});

const clearData = () => {
  models.nome = "";
  models.quantidade = 0;
  models.valor = 0.0;
};

const closeModal = () => {
  emits("update:modelValue", false);
  clearData();
};

const handleSubmit = async () => {
  console.log(models)
  try {
    models.loading = true;

    const { data, error } = await part.postPart(models);

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

      await refreshNuxtData("getPart");
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
