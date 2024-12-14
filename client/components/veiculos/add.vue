<template>
  <UModal
    v-model="isOpen"
    @update:model-value="emits('update:modelValue', isOpen)"
  >
    <UCard>
      <template #header>
        <h2 class="text">Cadastrar um novo veículo</h2>
        <p class="text-[13px] font-light">Preencha os campos corretamente</p>
      </template>

      <VeiculosForm
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

const vehicle = useVehicle();
const toast = useToast();

interface IModels extends IPostVehicle {
  loading: boolean;
}

const models = reactive<IModels>({
  loading: false,
  idCliente: 0,
  nomeProp: "",
  modelo: "",
  ano: 0,
  placa: "",
  frota: "",
  motor: ""
});

const schema = z.object({
  modelo: z.string().trim().min(3, "Modelo do veículo é um campo obrigatório."),
  ano: z.number().min(2, "Preencha o campo do ano de veículo."),
  placa: z.string().trim().min(6, "Placa do veículo é um campo obrigatório. Mínimo 6 digitos"),
  frota: z.string().trim(),
  motor: z.string().trim()
});

const clearData = () => {
  models.idCliente = 0;
  models.modelo = "";
  models.ano = 0;
  models.placa = "";
  models.frota = "";
  models.motor = ""
};

const closeModal = () => {
  emits("update:modelValue", false);
  clearData();
};

const handleSubmit = async () => {
  console.log(models)
  try {
    models.loading = true;

    const { data, error } = await vehicle.postVehicle(models);

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

      await refreshNuxtData("getVehicle");
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
