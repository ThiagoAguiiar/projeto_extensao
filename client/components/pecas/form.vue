<template>
  <UForm :schema="schema" :state="models" @submit="emits('submit')" class="space-y-3">
    <UFormGroup name="nome" label="Nome de identificação da peça" required>
      <UInput v-model="models.nome" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Nome de identificação.</p>
    </UFormGroup>

    <UFormGroup name="quantidade" label="Quantidade de peças que serão adicionadas" required>
      <UInput v-model.number="models.quantidade" :disabled="loading" />
      <p class="text-xs mt-2 text-gray-500">Quantidade total de peças adicionadas.</p>
    </UFormGroup>

    <UFormGroup name="valor" label="Valor unitário" required>
      <UInput v-model="valorFormatado" :disabled="loading" @input="InputValor" />
      <p class="text-xs mt-2 text-gray-500">Valor unitário da peça.</p>
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton color="red" variant="ghost" type="button" @click="emits('close')" :disabled="loading">
        Cancelar
      </UButton>

      <UButton color="black" type="submit" :loading="loading" :disabled="loading">
        Salvar
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type { IGetPart, IPostPart } from '~/types/IParts';

const part = usePart()

const props = defineProps({
  modelValue: {
    type: Object as PropType<IGetPart | IPostPart>,
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

const valorFormatado = computed({
  get() {
    if (models.value.valor == null) return ''

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(models.value.valor)
  },
  set(value: string) {
    let numericValue = parseFloat(value.replace(/\D/g, '')) / 100
    models.value.valor = isNaN(numericValue) ? 0 : numericValue
  }
})

const InputValor = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  let numericValue = parseFloat(value) / 100
  
  if (!isNaN(numericValue)) 
  {
    models.value.valor = numericValue
  }
}

watch(models, () => emits("update:modelValue", models), { deep: true });
watch(() => props.modelValue, (value) => (models.value = value));
</script>
