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
          <q-tab name="Geral" class="tab-items">
            <div class="flex items-center q-gutter-x-md">
              <q-icon name="sym_r_settings" size="sm" /> <span>Geral</span>
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
                    v-model="inputFilterEmpresaLista"
                    debounce="300"
                    @update:model-value="
                      () => {
                        empresaListaFilter = empresaLista.filter((v) =>
                          v.nome_empresa
                            .toLowerCase()
                            .includes(inputFilterEmpresaLista.toLowerCase())
                        );
                      }
                    "
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
                    @click="
                      empresaSelecionada = null;
                      tabInterna = 'detalhes';
                    "
                  />
                </div>
                <div>
                  <div v-for="n in empresaListaFilter" :key="n">
                    <EmpresaBtn
                      :nome="n?.nome_empresa"
                      :cdg_banco="n?.cdg_banco"
                      :cdg_documento="n?.cdg_documento"
                      :num_doc="n?.num_doc"
                      @click="
                        empresaSelecionada = n;
                        tabInterna = 'detalhes';
                      "
                      class="q-gutter-y-xs"
                    />
                  </div>
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
                <DetalhesEmpresa
                  :empresa="empresaSelecionada"
                  @atualizar="
                    async () => {
                      tabInterna = 'geral';
                      await atualizarListaEmpresas();
                    }
                  "
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-tab-panel>

          <q-tab-panel
            name="Geral"
            class="bg-soft-grey q-pb-sm q-pt-none q-px-sm"
          >
            <div class="titulo">Banco de Dados</div>
            <div class="full-width card-1 bg-lighter">
              <div class="flex items-center" style="margin-top: -10px">
                <span>Local</span>
                <q-toggle
                  label="Servidor"
                  v-model="options.servidor"
                  true-value="true"
                  false-value="false"
                />

                <q-input
                  v-if="options.servidor == 'true'"
                  dense
                  color="primary"
                  input-class="text-black"
                  label="Endereço do servidor"
                  class="q-ml-md"
                  style="width: 500px"
                  v-model="options.servidor_endereco"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-btn
        v-if="tab != 'Empresas'"
        type="submit"
        label="Salvar"
        color="primary"
        unelevated
        no-caps
        class="q-px-xl ronded-windows q-mr-md"
        style="position: absolute; right: 10px; bottom: 10px"
        @click="salvarConfig"
      />
    </transition>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import EmpresaBtn from "src/components/empresa/empresaBtn.vue";
import DetalhesEmpresa from "src/components/empresa/detalhesEmpresa.vue";
import { criarDB, getAllEmpresaDB } from "src/database/main";
import { actEmpresaGetAll } from "src/store/empresa";

const splitterModel = ref(20);
const tab = ref("Empresas");
const tabInterna = ref("geral");
const options = ref({ servidor: false, servidor_endereco: "" });
const empresaLista = ref([]);
const empresaListaFilter = ref([]);
const inputFilterEmpresaLista = ref("");
const empresaSelecionada = ref({});

function salvarConfig() {
  Object.keys(options.value).forEach((key) => {
    localStorage.setItem("config/" + key, options.value[key]);
  });
}
function carregaConfig() {
  Object.keys(options.value).forEach((key) => {
    if (localStorage.getItem("config/" + key)) {
      console.log(key, localStorage.getItem("config/" + key));
      options.value[key] = localStorage.getItem("config/" + key);
    }
  });
}

async function atualizarListaEmpresas() {
  empresaLista.value = await actEmpresaGetAll();
  empresaListaFilter.value = empresaLista.value;
}

onMounted(async () => {
  carregaConfig();
  criarDB();
  atualizarListaEmpresas();
});
</script>
<style lang="scss">
.tab-items {
  justify-content: flex-start;
}
</style>
