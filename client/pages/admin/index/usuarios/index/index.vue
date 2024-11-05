<template>
  <div class="w-full h-full flex py-7">
    <BaseSubmenu :links="links" />

    <div class="flex-1 px-5 space-y-3">
      <h2 class="text-xl font-regular">Lista de usuários do sistema</h2>

      <UTable v-if="data != null" :rows="data.data || []" :columns="columns">
        <template #actions-data>
          <UDropdown :items="options" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" square icon="ph:dots-three-bold" />
          </UDropdown>
        </template>

        <template #ativo-data="{ row }">
          <TableBullet :ativo="row.ativo" />
        </template>
      </UTable>

      <UsuariosAdd v-model="addUser" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const users = useUser();
const addUser = ref(false);

const { data } = await useLazyAsyncData("getUsers", () => {
  return users.getUsers();
});

const links: ISidebar[] = [
  {
    label: "Lista de usuários",
    to: "/admin/usuarios",
    icon: "fluent:list-24-regular",
  },
  {
    label: "Cadastrar usuário",
    icon: "fluent:add-24-regular",
    type: "button",
    click: () => (addUser.value = true),
  },
];

const columns = [
  {
    label: "Status",
    key: "ativo",
  },
  {
    label: "Nome",
    key: "nome",
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

const options = [
  [
    {
      label: "Excluir",
    },
    {
      label: "Inativar",
    },
  ],
];
</script>
