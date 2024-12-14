<template>
  <div class="px-5 flex-1">
    <div v-if="veiculo && veiculo.data" class="space-y-4">
      <div class="px-5">
        <p class="text-sm text-gray-500">Editar informações do veículo</p>
        <h2 class="text-lg">{{ veiculo?.data.modelo }}</h2>
      </div>

      <UForm :state="veiculo.data" @submit="handleSubmit">
        <BaseGroup name="idCliente" label="Proprietário" hint="Selecione o cliente responsável pelo veículo.">
          <USelect v-model="veiculo.data.idCliente" :options="cliente_select" :disabled="loading"
            placeholder="Selecione um cliente" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="modelo" label="Modelo" hint="Modelo do veículo">
          <UInput v-model="veiculo.data.modelo" :disabeld="loading" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="placa" label="Placa" hint="Placa do veículo">
          <UInput v-model="veiculo.data.placa" :disabeld="loading" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="ano" label="Ano" hint="Ano do veículo">
          <UInput v-model="veiculo.data.ano" :disabeld="loading" class="w-[450px] max-[450px]:w-full" />
        </BaseGroup>

        <BaseGroup name="motor" label="Motor" hint="Modelo do motor do veículo">
          <UInput v-model="veiculo.data.motor" :disabled="loading" class="w-[450px] max-[450px]:w-full">
          </UInput>
        </BaseGroup>
        <BaseGroup name="frota" label="Frota" hint="Frota que o veículo pertence">
          <UInput v-model="veiculo.data.frota" :disabled="loading" class="w-[450px] max-[450px]:w-full">
          </UInput>
        </BaseGroup>

        <div class="w-full flex items-center justify-end gap-x-2.5 mt-5">
          <UButton label="Cancelar" color="red" variant="soft" type="button" @click="confirmExit" />

          <UButton label="Salvar" type="submit" color="black" :loading="loading" :disabeld="loading" />
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

const u = useVehicle()
const user = useUser()
const route = useRoute();
const toast = useToast();

const loading = ref(false);

//GET CLIENTES PARA EXBIÇÃO NA PÁGINA DE EDIÇÃO
const cliente_select = ref<{ label: string; value: number }[]>([])

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
//CARREGAR OS DADOS OBTIDOS NO SELECT DURANTE O CARREGAMENTO DA PÁGINA VUE.
onMounted(get_clientes)

const { data: veiculo } = await useAsyncData("getVehiclePlate", () => {
  return u.getVehiclePlate(route.params.id.toString());
});

const confirmExit = () => {
  const c = confirm("Deseja realmente sair? As alterações não serão salvas");
  if (c) navigateTo("/admin/veiculos");
};

const handleSubmit = async () => {
  try {
    loading.value = true;

    if (veiculo.value && veiculo.value.data) {
      const { data, error } = await u.putVehicle({
        idCliente: veiculo.value.data.idCliente,
        ano: veiculo.value.data.ano,
        motor: veiculo.value.data.motor,
        frota: veiculo.value.data.frota,
        modelo: veiculo.value.data.modelo,
        placa: veiculo.value.data.placa
      });

      if (data.value) {
        toast.add({
          title: "Sucesso!",
          description: data.value.message,
          color: "green",
        });

        await navigateTo("/admin/veiculos");
        await refreshNuxtData("getVehicles");
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