<template>
  <UTooltip :text="ativo == true || ativo === 'True' ? 'Ativo' : 'Inativo'">
    <div class="flex w-full items-center justify-center gap-x-3 pl-2">
      <div
        :class="[
          'dot relative h-[10px] w-[10px] rounded-xl',
          ativo === 'True' || ativo == true
            ? 'active-green bg-[#11ee28]'
            : 'active-red bg-red-500',
        ]"
      ></div>

      <span
        :class="[
          'text-[13px]',
          ativo === 'True' || ativo == true ? 'text-[#11ee28]' : 'text-red-500',
        ]"
      >
        {{ ativo === "True" || ativo == true ? "Ativo" : "Inativo" }}
      </span>
    </div>
  </UTooltip>
</template>

<script lang="ts" setup>
defineProps({
  ativo: {
    type: [Boolean, String],
    default: false,
  },
});
</script>
