<template>
  <q-card flat square>
    <q-form @submit="async () => (header = await headerDeArquivo(remessa))">
      <q-card-section
        class="q-px-xs row content-between items-between component-full"
      >
        <div>
          <div class="titulo">Dados bancários</div>
          <div class="row col-12 bg-lighter card-1">
            <q-select
              :options="bancos"
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
            />
            <q-input
              dense
              color="primary"
              input-class="text-black"
              label="Número Agência"
              class="col-sm-2 q-px-xs"
              mask="#####-#"
              fill-mask="0"
              reverse-fill-mask
              bottom-slots
              v-model="remessa.num_agencia"
              :rules="[
                (val) => val.length <= 7 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_agencia, 7) }}</span>
              </template>
            </q-input>
            <q-input
              color="primary"
              input-class="text-black"
              dense
              label="Número da Conta"
              class="col-sm-4 q-px-xs"
              mask="############-#"
              fill-mask="0"
              reverse-fill-mask
              v-model="remessa.num_conta"
              bottom-slots
              :rules="[
                (val) => val.length <= 14 || '',
                (val) => !!val || 'Obrigatório',
              ]"
            >
              <template v-slot:counter>
                <span>{{ calcula_texto(remessa.num_conta, 14) }}</span>
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
              :options="inscricaoEmpresa"
              color="primary"
              dense
              label="Tipo Doc"
              class="col-sm-2 q-px-xs bg-white"
              option-label="name"
              option-value="cdg"
              emit-value
              map-options
              options-dense
              v-model="remessa.cdg_documento"
              :rules="[(val) => !!val || 'Obrigatório']"
            />
            <q-input
              color="primary"
              input-class="text-black"
              dense
              label="Número do Documento"
              class="col-sm-4 q-px-xs"
              mask="##############"
              fill-mask="0"
              reverse-fill-mask
              v-model="remessa.num_doc"
              bottom-slots
              :rules="[
                (val) => val.length <= 14 || '',
                (val) => !!val || 'Obrigatório',
              ]"
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
              :options="operacao"
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
            />
            <q-select
              :options="servicos"
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
            />
            <q-select
              :options="formaLancamento"
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
                bottom-slots
                v-model="remessa.cep"
                :rules="[
                  (val) => val.length <= 9 || '',
                  (val) => val.length > 8 || '',
                  (val) => !!val || 'Obrigatório',
                ]"
              >
                <template v-slot:counter>
                  <span>{{ calcula_texto(remessa.cep, 9) }}</span>
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
                fill-mask="0"
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
                :options="estados"
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
import headerDeArquivo from "src/geradores/headerDeArquivo";
import { onMounted, ref } from "vue";

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

function calcula_texto(texto, max) {
  return texto.length + "/" + max;
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
