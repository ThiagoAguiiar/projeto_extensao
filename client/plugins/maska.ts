import { vMaska } from "maska/vue";

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive("maska", vMaska);
});
