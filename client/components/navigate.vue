<template>
  <header class="w-full h-[80px] flex items-center justify-between px-11">
    <Logo />

    <UInput
      placeholder="Pesquisar"
      class="w-[350px]"
      icon="fluent:search-24-regular"
    />

    <div>
      <UDropdown :popper="{ placement: 'bottom-start' }" :items="items">
        <UAvatar size="lg" :alt="userData?.nome" class="border-2" />
      </UDropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
const auth = useAuth();

const userData = auth.decodeToken();

const items = [
  [
    {
      label: "Configurações",
      icon: "fluent:settings-24-regular",
    },
    {
      label: "Sair",
      icon: "solar:exit-linear",
      click: async() => await auth.logout(),
    },
  ],
];
</script>
