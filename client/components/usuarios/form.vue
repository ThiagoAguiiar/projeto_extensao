<template>
  <UForm
    :schema="schema"
    :state="models"
    @submit="emits('submit')"
    class="space-y-3"
  >
    <UFormGroup name="nome" label="Nome" required>
      <UInput v-model.trim="models.nome" :disabled="models.loading" />
    </UFormGroup>

    <UFormGroup name="telefone" label="Telefone" required>
      <UInput
        v-model.trim="models.telefone"
        :disabled="models.loading"
        v-maska="'(##) #####-####'"
      />
    </UFormGroup>

    <UFormGroup name="email" label="Email" required>
      <UInput v-model.trim="models.email" :disabled="models.loading" />
    </UFormGroup>

    <UFormGroup name="senha" label="Senha de acesso temporária" required>
      <div class="relative">
        <UInput
          :type="showPassword ? 'text' : 'password'"
          v-model.trim="models.senha"
          :disabled="models.loading"
        />

        <UTooltip
          v-if="models.senha.length > 0"
          :text="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
          class="absolute right-2 top-0"
        >
          <UButton
            square
            color="white"
            variant="soft"
            :icon="showPassword ? 'ph:eye-slash' : 'ph:eye'"
            @click="showPassword = !showPassword"
          />
        </UTooltip>
      </div>

      <p class="text-sm mt-2 text-gray-500">
        O usuário receberá um email para redefinição de senha
      </p>
    </UFormGroup>

    <UFormGroup name="ativo" label="Status do cadastro" required>
      <div class="flex items-center gap-x-1 mt-2">
        <UToggle v-model="models.ativo" :disabled="models.loading" />
        <span class="text-sm inline-block pl-2">
          {{ models.ativo ? "Ativo" : "Inativo" }}
        </span>
      </div>
    </UFormGroup>

    <div class="flex justify-end space-x-2">
      <UButton
        color="red"
        variant="ghost"
        type="button"
        @click="emits('close')"
        :disabled="models.loading"
      >
        Cancelar
      </UButton>

      <UButton
        color="black"
        type="submit"
        :loading="models.loading"
        :disabled="models.loading"
      >
        Salvar
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Object as PropType<IGetUser | IPostUser>,
    required: true,
  },
  schema: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["close", "update:modelValue", "submit"]);

const models = reactive({
  ...props.modelValue,
  loading: false,
});

const showPassword = ref(false);

watch(models, () => {
  emits("update:modelValue", models);
});
</script>
