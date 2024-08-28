<template>
  <div class="q-ma-sm component-full bg-soft-grey">
    <div class="titulo">Configurações</div>
    <q-splitter v-model="splitterModel" style="height: 250px">
      <template v-slot:before>
        <q-tabs
          indicator-color="primary"
          no-caps
          dense
          switch-indicator
          v-model="tab"
          vertical
          class="text-right text-dark"
          align="left"
        >
          <q-tab name="contas" class="tab-items">
            <div class="flex items-center q-gutter-x-md">
              <q-icon name="sym_o_person" size="sm" /> <span>Contas</span>
            </div></q-tab
          >
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="contas"> </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
import { ref } from "vue";
const splitterModel = ref(20);
const tab = ref("contas");
</script>
<style lang="scss">
.tab-items {
  justify-content: flex-start;
}
</style>
