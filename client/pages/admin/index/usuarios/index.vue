<template>
  <div class="w-full h-full flex py-7">
    <UsuariosAdd v-model="u.addUser" />
    <BaseSubmenu :links="links" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const u = useUser();

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
    click: () => (u.addUser = true),
  },
];
</script>
