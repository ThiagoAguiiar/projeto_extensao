<template>
  <div class="w-full h-full flex py-7">
    <UsuariosAdd v-model="u.addEmployee" />
    <BaseSubmenu :links="links" />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>

const u = useEmployee();

const links: ISidebar[] = [
  {
    label: "Lista de funcionários",
    to: "/admin/funcionarios",
    icon: "fluent:list-24-regular",
  },
  {
    label: "Cadastrar funcionários",
    icon: "fluent:add-24-regular",
    type: "button",
    click: () => (u.addEmployee = true),
  },
];
</script>
