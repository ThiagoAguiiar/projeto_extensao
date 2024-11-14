<template>
  <div
    class="h-full border-r border-r-gray-200 min-w-[250px] w-[250px] transition-all duration-300 ease-in-out"
  >
    <div class="relative h-full space-y-1 px-5">
      <div v-for="{ to, label, icon, type, click } in links">
        <NuxtLink
          v-if="type !== 'button'"
          @click="click"
          :to="to"
          class="truncate text-sm flex items-center gap-x-2 p-1.5 rounded-md hover:bg-gray-100 w-full"
        >
          <Icon :name="icon" />
          {{ label }}
        </NuxtLink>

        <span
          v-else
          @click="click"
          class="truncate text-sm flex items-center gap-x-2 p-1.5 rounded-md hover:bg-gray-100 w-full cursor-pointer"
        >
          <Icon :name="icon" />
          {{ label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  links: {
    type: Array as PropType<ISidebar[]>,
    required: true,
  },
});
</script>

<style scoped>
.exact-active-path {
  background: #f3f4f6;
}
</style>
