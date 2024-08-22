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
              v-model="remessa.cdg_banco"
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
              v-model="remessa.num_agencia"
              :rules="[
                (val) => val.length <= 6 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_agencia, 6) }}</span>
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
              v-model="remessa.num_conta"
              bottom-slots
              :rules="[
                (val) => val.length <= 13 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_conta, 13) }}</span>
              </template>
            </q-input>
            <q-input
              color="primary"
              input-class="text-black"
              dense
              label="Código de convênio com o banco"
              class="col-sm-3 q-px-xs"
              v-model="remessa.num_convenio"
              bottom-slots
              :rules="[
                (val) => val.length <= 20 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_convenio, 20) }}</span>
              </template>
            </q-input>

            <!-- NOTE: Colocar se tiver a opção -->

            <!-- q-input
            standout="bg-grey-2 text-black"
            input-class="text-black"
            rounded
            dense
            label="Número da Conta"
            class="col-sm-4 q-px-xs"
            mask="############-#"
            fill-mask="0"
            reverse-fill-mask
            v-model="remessa.num_conta"
          / -->
            <q-select
              :options="listaInscricaoEmpresa"
              color="primary"
              dense
              label="Tipo Doc"
              class="col-sm-2 q-px-xs bg-white"
              option-label="name"
              option-value="cdg"
              emit-value
              map-options
              use-input
              fill-input
              hide-selected
              options-dense
              v-model="remessa.cdg_documento"
              :rules="[(val) => !!val || 'Obrigatório']"
              @filter="
                async (val, update) => {
                  listaInscricaoEmpresa = filtrar(
                    val,
                    update,
                    inscricaoEmpresa,
                    'name'
                  );
                }
              "
            />
            <q-input
              color="primary"
              input-class="text-black"
              dense
              label="Número do Documento"
              class="col-sm-4 q-px-xs"
              mask="##############"
              reverse-fill-mask
              v-model="remessa.num_doc"
              bottom-slots
              :rules="
                remessa.cdg_documento != '0'
                  ? [
                      (val) => val.length <= 14 || '',
                      (val) => !!val || 'Obrigatório',
                    ]
                  : []
              "
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_doc, 14) }}</span>
              </template>
            </q-input>
            <q-input
              color="primary"
              input-class="text-black"
              dense
              label="Nome da empresa/pessoa"
              class="col-sm-6 q-px-xs"
              v-model="remessa.nome_empresa"
              @update:model-value="
                remessa.nome_empresa = remessa.nome_empresa.toUpperCase()
              "
              bottom-slots
              :rules="[
                (val) => val.length <= 30 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.nome_empresa, 30) }}</span>
              </template>
            </q-input>
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
            />
          </div>
          <div>
            <div class="titulo">Endereço</div>
            <div class="row col-12 bg-lighter card-1">
              <q-input
                dense
                color="primary"
                input-class="text-black"
                label="CEP"
                class="col-sm-2 q-px-xs"
                mask="#####-###"
                reverse-fill-mask
                unmasked-value
                bottom-slots
                v-model="remessa.cep"
                :rules="[
                  (val) => val.length <= 8 || '',
                  (val) => val.length > 7 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.cep, 8) }}</span>
                </template>
              </q-input>
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Logradouro"
                class="col-sm-8 q-px-xs"
                v-model="remessa.logradouro"
                @update:model-value="
                  remessa.logradouro = remessa.logradouro.toUpperCase()
                "
                bottom-slots
                :rules="[
                  (val) => val.length <= 30 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.logradouro, 30) }}</span>
                </template>
              </q-input>
              <q-input
                dense
                color="primary"
                input-class="text-black"
                label="Número"
                class="col-sm-2 q-px-xs"
                mask="#####"
                reverse-fill-mask
                bottom-slots
                v-model="remessa.endereco_num"
                :rules="[
                  (val) => val.length <= 7 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.endereco_num, 5) }}</span>
                </template>
              </q-input>
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Complemento"
                class="col-sm-4 q-px-xs"
                v-model="remessa.complemento"
                @update:model-value="
                  remessa.complemento = remessa.complemento.toUpperCase()
                "
                bottom-slots
                :rules="[(val) => val.length <= 15 || '']"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.complemento, 15) }}</span>
                </template>
              </q-input>
              <q-select
                :options="lista_estados"
                color="primary"
                dense
                label="Estado"
                class="col-sm-1 q-px-xs bg-white"
                options-dense
                v-model="remessa.estado"
                :rules="[(val) => !!val || 'Obrigatório']"
              />
              <q-input
                color="primary"
                input-class="text-black"
                dense
                label="Cidade"
                class="col-sm-4 q-px-xs"
                v-model="remessa.cidade"
                @update:model-value="
                  remessa.cidade = remessa.cidade.toUpperCase()
                "
                bottom-slots
                :rules="[(val) => val.length <= 20 || '']"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.cidade, 20) }}</span>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12">
            <p class="titulo">HEADER</p>
            <pre>{{ header }}</pre>
          </div>
        </div>

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
import { estados } from "src/tipos/cidades_estados";
import formaLancamento from "src/tipos/formaLancamento";
import bancos from "src/tipos/bancos";
import operacao from "src/tipos/operacao";
import inscricaoEmpresa from "src/tipos/inscricaoEmpresa";
import { geraHeaderArquivo, geraHeaderLote } from "src/geradores/headers";
import { filtrar, calcula_texto } from "src/utils/diversos";
import { onMounted, ref } from "vue";

const lista_bancos = ref(bancos);
const lista_servicos = ref(servicos);
const lista_estados = ref(estados);
const lista_forma_lancamento = ref(formaLancamento);
const listaOperacao = ref(operacao);
const listaInscricaoEmpresa = ref(inscricaoEmpresa);
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
});

function geraRemessa() {
  geraHeaderArquivo(remessa.value);
  geraHeaderLote(remessa.value);
}

onMounted(() => {});
</script>
<style lang="scss">
.q-field__native {
  color: #000 !important;
}
.q-field__append {
  color: #000 !important;
}
</style>
