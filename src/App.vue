<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter(); // Obtén la instancia del router

    return {
      router,
    };
  },
});
</script>

<style>
/* Estilos para App.vue */
</style>
