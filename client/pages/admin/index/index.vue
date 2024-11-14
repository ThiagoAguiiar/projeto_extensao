<template>
  <div class="px-10 py-5 space-y-5">
    <div>
      <h1 class="text-[16px] text-gray-500">Saudações,</h1>
      <span class="text-[30px] font-bold">
        {{ auth.decodeToken()?.nome }}
      </span>
    </div>

    <div class="space-y-4">
      <div>
        <h2 class="text-[20px] font-bold">Estatísticas Gerais</h2>

        <p class="text-gray-500 text-[15px]">
          Panorama geral dos dados e uso do sistema
        </p>
      </div>

      <div class="flex gap-3 gap-y-5 flex-wrap">
        <ChartsUser class="flex-1" />
        <ChartsCars class="flex-[2]" />

        <div
          class="w-full py-7 bg-primary-50 text-black rounded-2xl text-center"
        >
          <p class="text-[30px] font-medium">Controle de Peças</p>

          <p class="max-w-[768px] mx-auto mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            sunt quam ipsam consequuntur? Dolorem consequuntur saepe blanditiis
            tempore nam beatae.
          </p>

          <UButton
            label="Seu estoque"
            trailing-icon="pepicons-pencil:open"
            class="mt-5"
            color="black"
            @click="navigateTo('/admin/pecas')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuth();
</script>
