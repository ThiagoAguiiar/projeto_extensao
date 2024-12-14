<template>
    <div class="flex-1 px-5 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-regular">Listagem de estoque da oficina</h2>
  
        <UButton
          size="xs"
          variant="solid"
          label="Atualizar"
          color="white"
          icon="tabler:refresh"
          @click="refresh"
        />
      </div>
  
      <UTable v-if="data != null" :rows="data.data || []" :columns="columns">
        <template #actions-data="{ row }">
          <UDropdown :items="options(row)" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" square icon="ph:dots-three-bold" />
          </UDropdown>
        </template>
      </UTable>
  
      <p v-else>Nenhum resultado encontrado</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  
  const u = usePart();
  const toast = useToast();
  
  const { data, refresh } = await useLazyAsyncData("getParts", () => {
    return u.getParts();
    
  });
  const columns = [
    {
      label: "Nome",
      key: "nome",
      sortable: true,
    },
    {
      label: "Valor (R$)",
      key: "valor"
    },
    {
      label: "Quantidade disponível",
      key: "quantidade"
    },
    {
      label: "Ações",
      key: "actions"
    }
  ];
  
  const options = (row: IGetPart) => {
    return [
      [
        {
          label: "Visualizar",
          icon: "fluent:eye-24-regular",
          click: () => navigateTo("/admin/pecas/" + row.idPeca),
        },
        {
          label: "Excluir",
          icon: "fluent:delete-24-regular",
          click: async () => {
            const { error, data } = await u.deletePart(row.idPeca);
  
            if (error.value) {
              toast.add({
                title: "Erro!",
                description: error.value.message,
                color: "red",
              });
  
              return;
            }
  
            toast.add({
              title: "Sucesso!",
              description: data.value?.message,
              color: "green",
            });
  
            await refresh();
          },
        },
      ],
    ];
  };
  </script>
  