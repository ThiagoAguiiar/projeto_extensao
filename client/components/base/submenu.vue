<template>
  <div
    class="min-w-[250px] w-[250px] h-full border-r border-r-gray-200 px-5 space-y-1"
  >
    <div v-for="{ to, label, icon, type, click } in links">
      <NuxtLink
        v-if="type !== 'button'"
        @click="click"
        :to="to"
        class="text-sm block flex items-center gap-x-2 p-1.5 rounded-md hover:bg-gray-100 w-full"
      >
        <Icon :name="icon" />
        {{ label }}
      </NuxtLink>

      <span
        v-else
        @click="click"
        class="text-sm block flex items-center gap-x-2 p-1.5 rounded-md hover:bg-gray-100 w-full cursor-pointer"
      >
        <Icon :name="icon" />
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  links: {
    type: Array as PropType<ISidebar[]>,
    required: true,
  },
});
</script>

<style scoped>
.active-path {
  background: #f3f4f6;
}
</style>
