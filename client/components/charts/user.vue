<template>
  <div
    class="min-w-[450px] min-h-[400px] p-7 bg-[#f8f8f8] rounded-2xl flex items-center justify-center flex-col space-y-7"
  >
    <span class="text-center text-[20px] uppercase font-medium" v-if="data">
      usuários
    </span>

    <VChart v-if="data" :option="option" class="w-full h-full" autoresize />

    <div class="space-y-5 text-center" v-else>
      <Icon name="heroicons:chart-bar" size="80px" class="text-[#333]" />
      <p>Nenhum dado disponível para visualização</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";

import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { use } from "echarts/core";

import VChart from "vue-echarts";

use([
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  PieChart,
]);

const u = useUser();

const { data } = await useAsyncData("getUsersGroup", async () => {
  const all = await u.getUsers();

  if (all) {
    return {
      ativos: all.data.filter((u) => u.ativo).length,
      inativos: all.data.filter((u) => !u.ativo).length,
    };
  }

  return null;
});

const option = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "0%",
    left: "center",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      data: [
        {
          value: data.value?.ativos,
          name: "ativos",
        },
        {
          value: data.value?.inativos,
          name: "inativos",
          itemStyle: { color: "#f04243" },
        },
      ],
    },
  ],
});
</script>
