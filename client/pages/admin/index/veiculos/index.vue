<template>
    <div class="py-7 w-full h-full flex">
        <VeiculosAdd v-model="u.addVehicle"/>
        <BaseSubmenu :links="links"/>
        <NuxtPage />
    </div>
</template>

<script lang="ts" setup>
    const u = useVehicle()

    const links: ISidebar[] = [
        {
            label: "Lista de veículos",
            to: "/admin/veiculos",
            icon: "fluent:list-24-regular"
        },
        {
            label: "Adicionar novos veículos",
            icon: "fluent:add-24-regular",
            type: "button",
            click: () => (u.addVehicle = true)
        }
    ]
</script>
