<template>
  <div class="px-10 py-5 space-y-6">
    <div>
      <span class="text-[25px] font-bold"> Página Inicial </span>
      <p class="text-gray-500">
        Seu relatório simplificado com as principais métricas do seu negócio
      </p>
    </div>

    <div class="flex gap-3 gap-y-5 flex-wrap">
      <ChartsUser class="flex-1" />
      <ChartsCars class="flex-[2]" />
      <ChartsCars class="w-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();
</script>
