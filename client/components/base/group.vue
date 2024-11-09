<template>
  <div
    class="flex w-full justify-between gap-5 border-b border-b-gray-200 px-6 py-5 last-of-type:border-b-0 max-[881px]:flex-col dark:border-b-gray-800"
  >
    <div>
      <h4 class="text-sm font-semibold">
        {{ label }}
        <span v-if="required" class="text-red-600">*</span>
      </h4>

      <p class="last:border-b-none text-[13px] text-gray-500">
        {{ hint }}
      </p>
    </div>

    <div class="space-y-3">
      <UFormGroup :name="name">
        <slot></slot>
      </UFormGroup>

      <slot name="item"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
});
</script>
