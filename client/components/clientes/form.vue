<template>
  <UForm
    :schema="schema"
    :state="models"
    @submit="emits('submit')"
    class="space-y-3"
  >
    <UFormGroup name="nome" label="Nome" required>
      <UInput v-model.trim="models.nome" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Nome do cliente. Campo obrigatório</p>
    </UFormGroup>

    <UFormGroup name="telefone" label="Telefone" required>
      <UInput
        v-model.trim="models.telefone"
        :disabled="loading"
        v-maska="'(##) #####-####'"
      />
      <p class="text-xs mt-2 text-gray-500">Telefone do cliente. Campo obrigatório</p>
    </UFormGroup>

    <UFormGroup name="email" label="Email">
      <UInput v-model.trim="models.email" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Email pessoal ou corporativo do cliente. Campo opcional</p>
    </UFormGroup>

    <UFormGroup name="endereco" label="Endereço">
      <div class="relative">
        <UInput
          v-model.trim="models.endereco"
          :disabled="loading"
        />
        <p class="text-xs mt-2 text-gray-500">Endereço do cliente. Campo opcional</p>
      </div>
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton
        color="red"
        variant="ghost"
        type="button"
        @click="emits('close')"
        :disabled="loading"
      >
        Cancelar
      </UButton>

      <UButton
        color="black"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        Salvar
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>

const props = defineProps({
  modelValue: {
    type: Object as PropType<IGetClient | IPostClient>,
    required: true,
  },
  schema: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["close", "update:modelValue", "submit"]);

const models = ref(props.modelValue);

watch(models, () => emits("update:modelValue", models), { deep: true });
watch(() => props.modelValue, (value) => (models.value = value));
</script>
