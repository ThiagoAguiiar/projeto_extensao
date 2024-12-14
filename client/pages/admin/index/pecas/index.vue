<template>
    <div class="w-full h-full flex py-7">
      <PecasAdd v-model="u.addPart" />
      <BaseSubmenu :links="links" />
      <NuxtPage />
    </div>
  </template>
  
  <script lang="ts" setup>
  
  const u = usePart();
  
  const links: ISidebar[] = [
    {
      label: "Listagem de estoque",
      to: "/admin/pecas",
      icon: "fluent:list-24-regular",
    },
    {
      label: "Adicionar nova peça",
      icon: "fluent:add-24-regular",
      type: "button",
      click: () => (u.addPart = true),
    },
  ];
  </script>
  