<template>
  <div class="q-ma-sm bg-soft-grey" style="height: calc(100vh - 60px)">
    <div class="titulo">Configurações</div>
    <q-splitter v-model="splitterModel" style="height: calc(100vh - 110px)">
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
          <q-tab name="Empresas" class="tab-items">
            <div class="flex items-center q-gutter-x-md">
              <q-icon name="sym_r_group" size="sm" /> <span>Empresas</span>
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
          <q-tab-panel name="Empresas" class="bg-soft-grey q-py-none q-px-xs">
            <q-tab-panels
              v-model="tabInterna"
              animated
              swipeable
              vertical
              transition-prev="jump-right"
              transition-next="jump-left"
            >
              <q-tab-panel name="geral" class="bg-soft-grey q-py-none q-px-xs">
                <div class="flex justify-between q-mb-md">
                  <q-input
                    dense
                    color="primary"
                    input-class="text-black"
                    class="bg-white rounded-borders"
                    placeholder="Buscar Empresa"
                    style="max-width: 300px"
                  >
                    <template v-slot:append>
                      <q-icon name="sym_r_search" color="grey-8" />
                    </template>
                  </q-input>
                  <q-btn
                    label="Adicionar"
                    icon="sym_r_add"
                    unelevated
                    color="primary"
                    no-caps
                  />
                </div>
                <div>
                  <EmpresaBtn
                    nome="Teste"
                    cdg_banco="237"
                    cdg_doc="1"
                    num_doc="06588672101"
                    @click="tabInterna = 'detalhes'"
                  />
                </div>
              </q-tab-panel>
              <q-tab-panel
                name="detalhes"
                class="bg-soft-grey q-py-none q-px-xs"
                style="height: calc(100vh - 110px)"
              >
                <div class="full-width flex">
                  <q-btn
                    dense
                    icon="sym_r_arrow_back"
                    flat
                    round
                    @click="tabInterna = 'geral'"
                  />
                  <div class="titulo">Detalhes</div>
                </div>
                <DetalhesEmpresa />
              </q-tab-panel>
            </q-tab-panels>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script setup>
import { ref } from "vue";

import EmpresaBtn from "src/components/empresa/empresaBtn.vue";
import DetalhesEmpresa from "src/components/empresa/detalhesEmpresa.vue";
const splitterModel = ref(20);
const tab = ref("Empresas");
const tabInterna = ref("geral");
</script>
<style lang="scss">
.tab-items {
  justify-content: flex-start;
}
</style>
