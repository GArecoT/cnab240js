<template>
  <q-card flat square>
    <q-form @submit="geraRemessa">
      <q-card-section
        class="q-px-xs row content-between items-between component-full"
      >
        <div>
          <div class="titulo">Dados bancários</div>
          <div class="row col-12 bg-lighter card-1">
            <q-select
              :options="empresaListaFilter"
              color="primary"
              dense
              label="Empresa"
              class="col-sm-3 q-px-xs bg-white"
              option-label="nome_empresa"
              option-value="id"
              emit-value
              map-options
              options-dense
              v-model="empresaSelecionada.id"
              :rules="[(val) => !!val || 'Obrigatório']"
              use-input
              fill-input
              hide-selected
              @update:model-value="pegaEmpresa"
              @filter="
                async (val, update) => {
                  empresaListaFilter = filtrar(
                    val,
                    update,
                    empresaLista,
                    'nome_empresa'
                  );
                }
              "
            />
            <q-select
              :options="listaOperacao"
              color="primary"
              dense
              label="Tipo de Operação"
              class="col-sm-3 q-px-xs bg-white"
              option-label="name"
              option-value="cdg"
              emit-value
              map-options
              options-dense
              v-model="remessa.cdg_operacao"
              :rules="[(val) => !!val || 'Obrigatório']"
              use-input
              fill-input
              hide-selected
              @filter="
                async (val, update) => {
                  listaOperacao = filtrar(val, update, operacao, 'name');
                }
              "
            />
            <q-select
              :options="lista_servicos"
              color="primary"
              dense
              label="Tipo de Serviço"
              class="col-sm-3 q-px-xs bg-white"
              option-label="name"
              option-value="cdg"
              emit-value
              map-options
              options-dense
              v-model="remessa.cdg_servico"
              :rules="[(val) => !!val || 'Obrigatório']"
              use-input
              fill-input
              hide-selected
              @filter="
                async (val, update) => {
                  lista_servicos = filtrar(val, update, servicos, 'name');
                }
              "
            />
            <q-select
              :options="lista_forma_lancamento"
              color="primary"
              dense
              label="Forma de lançamento"
              class="col-sm-3 q-px-xs bg-white"
              option-label="name"
              option-value="cdg"
              emit-value
              map-options
              options-dense
              v-model="remessa.cdg_lancamento"
              :rules="[(val) => !!val || 'Obrigatório']"
              use-input
              fill-input
              hide-selected
              @filter="
                async (val, update) => {
                  lista_forma_lancamento = filtrar(
                    val,
                    update,
                    formaLancamento,
                    'name'
                  );
                }
              "
              @update:model-value="
                if (
                  remessa.cdg_lancamento == '47' ||
                  remessa.cdg_lancamento == '45'
                ) {
                  remessa.cdg_camara_favorecido = '009';
                }
              "
            />
          </div>
          <div>
            <div class="titulo">Favorecido</div>
            <div class="row col-12 bg-lighter card-1">
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Num. Documento"
                class="col-sm-4 q-px-xs"
                v-model="favorecido.num_doc_favorecido"
                bottom-slots
                :rules="[
                  (val) => val.length <= 20 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
                debounce="600"
                @update:model-value="pegaFavorecido"
              >
                <template v-slot:counter>
                  <span>{{
                    calcula_texto(favorecido.num_doc_favorecido, 20)
                  }}</span>
                </template>
              </q-input>
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Nome do favorecido"
                class="col-sm-6 q-px-xs"
                v-model="favorecido.nome_favorecido"
                @update:model-value="
                  favorecido.nome_favorecido =
                    favorecido.nome_favorecido.toUpperCase()
                "
                bottom-slots
                :rules="[
                  (val) => val.length <= 30 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{
                    calcula_texto(favorecido.nome_favorecido, 30)
                  }}</span>
                </template>
              </q-input>

              <q-input
                color="primary"
                input-class="text-black"
                dense
                mask="##/##/####"
                unmasked-value
                label="Data Pagamento"
                class="col-sm-2 q-px-xs"
                v-model="remessa.data_pagamento"
                bottom-slots
                :rules="[
                  (val) => val.length <= 8 || '',
                  (val) => val.length > 7 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.data_pagamento, 8) }}</span>
                </template>
              </q-input>
              <q-select
                :options="lista_camaras"
                color="primary"
                dense
                label="Câmara"
                class="col-sm-3 q-px-xs bg-white"
                option-label="name"
                option-value="cdg"
                emit-value
                map-options
                options-dense
                v-model="remessa.cdg_camara_favorecido"
                :rules="[(val) => !!val || 'Obrigatório']"
                use-input
                fill-input
                hide-selected
                @filter="
                  async (val, update) => {
                    lista_camaras = filtrar(
                      val,
                      update,
                      camaraCentraliza,
                      'name'
                    );
                  }
                "
              />
              <q-select
                :options="lista_bancos"
                color="primary"
                dense
                label="Banco"
                class="col-sm-3 q-px-xs bg-white"
                option-label="name"
                option-value="cdg"
                emit-value
                map-options
                options-dense
                v-model="favorecido.cdg_banco_favorecido"
                :rules="[(val) => !!val || 'Obrigatório']"
                use-input
                fill-input
                hide-selected
                @filter="
                  async (val, update) => {
                    lista_bancos = filtrar(val, update, bancos, 'name');
                  }
                "
              />
              <q-input
                dense
                color="primary"
                input-class="text-black"
                label="Número Agência"
                class="col-sm-2 q-px-xs"
                mask="#####-#"
                reverse-fill-mask
                unmasked-value
                bottom-slots
                v-model="favorecido.num_agencia_favorecido"
                :rules="[
                  (val) => val.length <= 6 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{
                    calcula_texto(favorecido.num_agencia_favorecido, 6)
                  }}</span>
                </template>
              </q-input>
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Número da Conta"
                class="col-sm-4 q-px-xs"
                mask="############-#"
                reverse-fill-mask
                unmasked-value
                v-model="favorecido.num_conta_favorecido"
                bottom-slots
                :rules="[
                  (val) => val.length <= 13 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{
                    calcula_texto(favorecido.num_conta_favorecido, 13)
                  }}</span>
                </template>
              </q-input>

              <q-select
                :options="lista_moedas"
                color="primary"
                dense
                label="Moeda"
                class="col-sm-3 q-px-xs bg-white"
                option-label="name"
                option-value="cdg"
                emit-value
                map-options
                options-dense
                v-model="remessa.cdg_moeda"
                :rules="[(val) => !!val || 'Obrigatório']"
                use-input
                fill-input
                hide-selected
                @filter="
                  async (val, update) => {
                    lista_moedas = filtrar(val, update, moedas, 'name');
                  }
                "
              />
              <q-input
                color="primary"
                input-class="text-black"
                dense
                mask="###.###.###.###,##"
                reverse-fill-mask
                prefix="R$"
                unmasked-value
                label="Valor do Pagamento"
                class="col-sm-2 q-px-xs"
                v-model="remessa.valor_pagamento"
                bottom-slots
                :rules="[
                  (val) => val.length <= 13 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.valor_pagamento, 13) }}</span>
                </template>
              </q-input>
              <q-select
                v-if="
                  remessa.cdg_lancamento == '45' ||
                  remessa.cdg_lancamento == '47'
                "
                :options="conta"
                color="primary"
                dense
                label="Tipo Conta"
                class="col-sm-2 q-px-xs bg-white"
                option-label="name"
                option-value="cdg"
                emit-value
                map-options
                options-dense
                v-model="empresaSelecionada.cdg_tipo_conta"
                :rules="[(val) => !!val || 'Obrigatório']"
              />
            </div>
          </div>
          <div class="col-12">
            <p class="titulo">HEADER</p>
            <pre>{{ header }}</pre>
          </div>
        </div>
        <!-- Data real manda tudo zero (provisório) -->
        <!-- Nosso número em branco (provisório) -->
        <!-- codigo de finalidade doc branco (provisório) -->

        <div class="flex justify-end col-12">
          <q-btn
            type="submit"
            label="Gerar"
            color="primary"
            unelevated
            no-caps
            class="q-px-xl ronded-windows q-mr-md"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import servicos from "src/tipos/servicos";
import formaLancamento from "src/tipos/formaLancamento";
import bancos from "src/tipos/bancos";
import moedas from "src/tipos/moedas";
import operacao from "src/tipos/operacao";
import conta from "src/tipos/conta";
import { geraHeaderArquivo, geraHeaderLote } from "src/geradores/headers";
import { filtrar, calcula_texto, exportarTXT } from "src/utils/diversos";
import { onMounted, ref, toRaw } from "vue";
import camaraCentraliza from "src/tipos/camaraCentraliza";
import { getAllEmpresaDB, getEmpresaDB } from "src/database/main";
import { actGetEmpresa } from "src/store/empresa";
import {
  actAdicionarDestinatario,
  actGetDestinatario,
} from "src/store/destinatario";

const empresaLista = ref([]);
const empresaListaFilter = ref([]);
const empresaSelecionada = ref({});
const lista_bancos = ref(bancos);
const lista_servicos = ref(servicos);
const lista_moedas = ref(moedas);
const lista_camaras = ref(camaraCentraliza);
const lista_forma_lancamento = ref(formaLancamento);
const listaOperacao = ref(operacao);
const header = ref("");
const remessa = ref({
  num_agencia: "",
  num_convenio: "",
  num_conta: "",
  num_doc: "",
  nome_empresa: "",
  cdg_verificador_conta: " ",
  num_lote: "0000",
  num_sequencial: "000000",
  logradouro: "",
  endereco_num: "",
  cep: "",
  complemento: "",
  cidade: "",
  data_pagamento: "",
  valor_pagamento: "",
  chavePix: "",
  cdg_moeda: "BRL",
});
const favorecido = ref({
  num_agencia_favorecido: "",
  num_conta_favorecido: "",
  cdg_banco_favorecido: "",
  nome_favorecido: "",
  num_doc_favorecido: "",
});
async function atualizarListaEmpresas() {
  empresaLista.value = await getAllEmpresaDB();
  empresaListaFilter.value = empresaLista.value;
}
async function pegaEmpresa(key) {
  await actGetEmpresa(key).then(
    (value) => (remessa.value = { ...remessa.value, ...value })
  );
}
async function salvaFavorecido() {
  await actAdicionarDestinatario(structuredClone(toRaw(favorecido.value)));
}
async function pegaFavorecido() {
  const response = await actGetDestinatario(
    favorecido.value.num_doc_favorecido
  );
  console.log(response);
  if (response != undefined) {
    favorecido.value = response;
  }
}

async function geraRemessa() {
  // NOTE: Não esquecer de aumentar o num doc empresa para cada header de lote!
  favorecido.value.id = favorecido.value.num_doc_favorecido;
  salvaFavorecido();
  const headerLote = await geraHeaderLote({
    ...remessa.value,
    ...favorecido.value,
  });
  const headerArquivo = await geraHeaderArquivo({
    ...remessa.value,
    ...favorecido.value,
  });
  console.log(headerLote);
  window.open(exportarTXT(headerArquivo + "\n" + headerLote));
}

onMounted(() => {
  atualizarListaEmpresas();
});
</script>
<style lang="scss">
.q-field__native {
  color: #000 !important;
}
.q-field__append {
  color: #000 !important;
}
</style>
