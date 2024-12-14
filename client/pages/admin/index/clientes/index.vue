<template>
  <div class="w-full h-full flex py-7">
    <ClientesAdd v-model="u.addUser" />
    <BaseSubmenu :links="links" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const u = useUser();

const links: ISidebar[] = [
  {
    label: "Lista de clientes",
    to: "/admin/clientes",
    icon: "fluent:list-24-regular",
  },
  {
    label: "Cadastrar novos clientes",
    icon: "fluent:add-24-regular",
    type: "button",
    click: () => (u.addUser = true),
  },
];
</script>
