<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr lFf" container class="pagina-full">
      <q-header class="bg-soft-grey text-dark">
        <div class="q-py-sm row items-center">
          <q-item
            dense
            to="/remessa"
            class="q-ml-md cursor-pointer q-px-sm q-py-none"
            >Remessa</q-item
          >

          <q-item
            dense
            to="/config"
            class="q-ml-md cursor-pointer q-px-sm q-py-none"
            >Configurações</q-item
          >
          <q-item dense class="q-ml-md cursor-pointer q-px-xs q-py-none"
            >Sobre</q-item
          >
        </div>
      </q-header>

      <q-page-container class="bg-soft-grey">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <router-view class="bg-soft-grey" />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { existeDB, criarDB } from "src/database/main";

onMounted(() => {
  if (!existeDB("BD")) criarDB();
});
</script>
<style lang="scss">
.pagina-full {
  min-height: calc(100vh);
}
</style>
