<template>
    <div class="px-5 flex-1">
      <div v-if="peca && peca.data" class="space-y-4">
        <div class="px-5">
          <p class="text-sm text-gray-600">Editar informações de</p>
          <h2 class="text-lg">{{ peca?.data.nome }}</h2>
        </div>
  
        <UForm :state="peca.data" @submit="handleSubmit">
          <BaseGroup name="nome" label="Nome" hint="Nome de identificação da peça." required>
            <UInput v-model="peca.data.nome" :disabled="loading" class="w-[450px] max-[450px]:w-full" />
          </BaseGroup>
  
          <BaseGroup name="quantidade" label="Quantidade" hint="Quantidade de peças disponíveis.">
            <UInput v-model="peca.data.quantidade" :disabled="loading" class="w-[450px] max-[450px]:w-full"/>
          </BaseGroup>
  
          <BaseGroup name="valor" label="Valor da peça em R$." hint="Valor unitário da peça." required>
            <UInput v-model="peca.data.valor" :disabled="loading" class="w-[450px] max-[450px]:w-full" />
          </BaseGroup>
  
          <div class="w-full flex items-center justify-end gap-x-2.5 mt-5">
            <UButton label="Cancelar" color="red" variant="soft" type="button" @click="confirmExit" />
  
            <UButton label="Salvar" type="submit" color="black" :loading="loading" :disabled="loading" />
          </div>
        </UForm>
      </div>
  
      <div class="w-full h-full flex justify-center items-center" v-else>
        <p>Nenhum usuário encontrado =C</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  const u = usePart();
  const route = useRoute();
  const toast = useToast();
  
  const loading = ref(false);
  
  const { data: peca } = await useAsyncData("getPartId", () => {
      return u.getPartId(route.params.id.toString());
  });
  
  const confirmExit = () => {
    const c = confirm("Deseja realmente sair? As alterações não serão salvas");
    if (c) navigateTo("/admin/pecas");
  };
  
  const handleSubmit = async () => {
    try {
      loading.value = true;
  
      if (peca.value) {
        const { data, error } = await u.putPart({
          idPeca: peca.value.data.idPeca,
          nome: peca.value.data.nome,
          valor: peca.value.data.valor,
          quantidade: peca.value.data.quantidade
        });
  
        if (data.value) {
          toast.add({
            title: "Sucesso!",
            description: data.value.message,
            color: "green",
          });
  
          await navigateTo("/admin/pecas");
          await refreshNuxtData("getParts");
        }
  
        if (error.value) {
          toast.add({
            title: "Atenção!",
            description: error.value.message,
            color: "yellow",
          });
        }
      }
    } catch (err) {
      console.log(err);
      toast.add({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as informações",
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };
  </script>
  