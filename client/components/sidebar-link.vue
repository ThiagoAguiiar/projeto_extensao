<template>
  <div
    class="w-full flex items-center justify-center"
    v-if="type === 'link'"
    v-for="{ icon, label, to, color } in links"
  >
    <UTooltip :text="label">
      <NuxtLink
        :to="to"
        :class="['flex flex-col gap-y-0.5 items-center cursor-pointer', color]"
      >
        <div
          class="w-[30px] h-[30px] flex items-center justify-center hover:bg-[#eaeaea] rounded-md link-icon"
        >
          <Icon :name="icon" size="20px" />
        </div>

        <span class="block text-center text-[12px]">{{ label }}</span>
      </NuxtLink>
    </UTooltip>
  </div>

  <div v-for="{ icon, label, color } in links" v-else>
    <UTooltip :text="label">
      <span
        :class="['flex flex-col items-center cursor-pointer', color]"
        @click.prevent="emits('click')"
      >
        <div
          class="w-[30px] h-[30px] flex items-center justify-center hover:bg-[#eaeaea] rounded-md"
        >
          <Icon :name="icon" size="20px" />
        </div>

        <span class="block text-[12px] text-center">{{ label }}</span>
      </span>
    </UTooltip>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  links: {
    type: [Array] as PropType<ISidebar[]>,
    required: true,
  },
  type: {
    type: String as PropType<"link" | "button">,
    default: "link",
  },
});

const emits = defineEmits(["click"]);
</script>

<style scoped>
.exact-active-path .link-icon {
  background: #000;
  color: #fff;
}
</style>
