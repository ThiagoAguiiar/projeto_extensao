<template>
  <aside id="aside" class="w-[100px] min-w-[80px] h-full">
    <div class="flex flex-col gap-y-2.5">
      <SidebarLink :links="sidebarLinks" />
    </div>

    <div class="flex items-center justify-center">
      <SidebarLink @click="handleClick" :links="exitLink" type="button" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
const sidebarLinks = [
  {
    to: "/admin",
    label: "Home",
    icon: "fluent:home-24-regular",
  },
  {
    to: "/admin/usuarios",
    label: "Usuários",
    icon: "fluent:person-24-regular",
  },
  {
    to: "/admin/clientes",
    label: "Clientes",
    icon: "fluent:people-24-regular",
  },
  {
    to: "/admin/veiculos",
    label: "Veículos",
    icon: "fluent:road-24-regular",
  },
  {
    to: "/admin/os",
    label: "Ordem de serviço",
    icon: "solar:document-outline",
  },
];

const exitLink = [
  {
    label: "Sair",
    icon: "solar:exit-linear",
    color: "text-red-500",
  },
];

const handleClick = () => {
  const auth = useAuth();

  auth.logout();
};
</script>

<style scoped>
#aside {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 100px;
}
</style>
