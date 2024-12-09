<template>
  <div class="flex-1 px-5 space-y-3">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-regular">Lista de funcionários da oficina</h2>

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

      <template #ativo-data="{ row }">
        <TableBullet :ativo="row.ativo" />
      </template>
    </UTable>

    <p v-else>Nenhum resultado encontrado</p>
  </div>
</template>

<script lang="ts" setup>
import type { IGetEmployee } from '~/types/IEmployee';

const u = useEmployee();
const toast = useToast();

const { data, refresh } = await useLazyAsyncData("getUsers", () => {
  return u.getEmployees();
});

const columns = [
  {
    label: "Status",
    key: "ativo",
  },
  {
    label: "Nome",
    key: "nome",
    sortable: true,
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Telefone",
    key: "telefone",
  },
  {
    label: "Ações",
    key: "actions",
  },
];

const options = (row: IGetEmployee) => {
  return [
    [
      {
        label: "Visualizar",
        icon: "fluent:eye-24-regular",
        click: () => navigateTo("/admin/funcionarios/" + row.idFuncionario),
      },
      {
        label: "Excluir",
        icon: "fluent:delete-24-regular",
        click: async () => {
          const { error, data } = await u.deleteEmployee(row.email, row.idFuncionario);

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
