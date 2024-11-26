<template>
    <div class="flex-1 px-5 space-y-3">
        <div class="flex items-center justify-between">
            <h2 class="text-xl font-regular">Listagem de veículos cadastrados no sistema</h2>

            <UButton size="xs" variant="solid" label="Atualizar" color="white" icon="tabler:refresh" @click="refresh" />
        </div>

        <UTable v-if="data != null" :rows="data.data || []" :columns="columns">
            <template #actions-data="{ row }">
                <UDropdown :items="options(row)" :popper="{ placement: 'bottom-start' }">
                    <UButton color="white" square icon="ph:dots-three-bold" />
                </UDropdown>
            </template>

            <template #ativo-data="{ row }">
                <TableBullet :ativo="row.ativo" />
            </template>
        </UTable>

        <p v-else>Nenhum resultado encontrado</p>
    </div>
</template>

<script lang="ts" setup>
const u = useVehicle()
const toast = useToast()

const { data, refresh } = await useLazyAsyncData("getVehicles", () => {
    return u.getVehicles()
})

const columns = [
    {
        label: "Status",
        key: "ativo"
    },
    {
        label: "Modelo veículo",
        key: "modelo_veiculo"
    },
    {
        label: "Ano",
        key: "ano"
    },
    {
        label: "Cliente dono do veículo",
        key: "cliente_responsavel"
    },
    {
        label: "Placa do veículo",
        key: "placa"
    },
    {
        label: "Frota",
        key: "frota"
    }
]

const options = (row: IGetVehicle) => {
    return [
        [
            {
                label: "Visualizar",
                icon: "fluent:eye-24-regular",
                click: () => navigateTo('admin/veiculos' + row.placa)
            },
            {
                label: "Excluir",
                icon: "fluent:delete-24-regular",
                click: async () => {
                    const { error, data } = await u.deleteVehicle(row.placa)

                    if (error.value) {
                        toast.add({
                            title: "Erro",
                            description: data.value?.message,
                            color: "red"
                        })
                        return
                    }
                    else {
                        toast.add({
                            title: "Sucesso",
                            description: data.value?.message,
                            color: "green"
                        })
                    }
                    await refresh()
                }
            }
        ]
    ]
}
</script>