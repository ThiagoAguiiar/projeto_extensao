<template>
  <UForm :schema="schema" :state="models" @submit="emits('submit')" class="space-y-3">
    <UFormGroup name="idCliente" label="Proprietário" required>
      <USelect v-model="models.idCliente" :options="cliente_select" :disabled="loading"
        placeholder="Selecione um cliente" />
      <p class="text-xs mt-2 text-gray-500">Selecione um cliente responsável pelo veículo.</p>
    </UFormGroup>

    <UFormGroup name="modelo" label="Modelo do veículo" required>
      <UInput v-model.trim="models.modelo" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Modelo do veículo. Campo obrigatório.</p>
    </UFormGroup>

    <UFormGroup name="ano" label="Ano do veículo">
      <UInput v-model.number="models.ano" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Ano de fabricação do veículo.</p>
    </UFormGroup>

    <UFormGroup name="placa" label="Placa">
      <UInput v-model="models.placa" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Placa do veículo. Campo obrigatório.</p>
    </UFormGroup>

    <UFormGroup name="motor" label="Tipo do motor">
      <UInput v-model="models.motor" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Tipo de motor do veículo.</p>
    </UFormGroup>

    <UFormGroup name="frota" label="Frota">
      <UInput v-model="models.frota" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Caso o veículo pertencer a uma empresa.</p>
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="red" variant="ghost" type="button" @click="emits('close')" :disabled="loading">
        Cancelar
      </UButton>

      <UButton color="black" type="submit" :loading="loading" :disabled="loading">
        Salvar
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
const user = useUser()

const props = defineProps({
  modelValue: {
    type: Object as PropType<IGetVehicle | IPostVehicle>,
    required: true,
  },
  schema: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close", "update:modelValue", "submit"]);

const models = ref(props.modelValue);
const cliente_select = ref<{ label: string; value: number }[]>([])

//GET CLIENTES PARA CRIAR UM NOVO REGISTRO NA ROTA DE VEÍCULOS
//O USUÁRIO PODERÁ VINCULAR UM CLIENTE NA HORA DE CADASTRAR UM NOVO VEICULO. 
//POR ISSO O GET CLIENTES.
const get_clientes = async () => {
  try {
    const response = await user.getUsers()

    if (response?.data) {
      cliente_select.value = response.data.map((cliente) => ({
        label: cliente.nome,
        value: cliente.idCliente,
      }))
    }
    else {
      cliente_select.value = [];
    }
  }
  catch (error) {
    console.error("Erro ao buscar clientes:", error)
    cliente_select.value = []
  }
}

//SEMPRE QUE UM CLIENTE FOR SELECIOINADO NO USELECT, ATUALIZAR A MODEL.NOMEPROP PARA O VALUE DO SELECT (NOME DO CLIENTE)
watch(() => models.value.idCliente, (id_cliente) => {
  let cliente_selecionado = cliente_select.value.find((cliente) => cliente.value == id_cliente)
  models.value.nomeProp = cliente_selecionado ? cliente_selecionado.label : ""
})

onMounted(get_clientes)

watch(models, () => emits("update:modelValue", models), { deep: true });
watch(() => props.modelValue, (value) => (models.value = value));
</script>
