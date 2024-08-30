<template>
  <q-form
    @submit="salvar"
    class="row content-between items-between"
    style="height: calc(100vh - 160px)"
  >
    <div class="full-width">
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
          v-model="lclEmpresa.cdg_banco"
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
          v-model="lclEmpresa.num_agencia"
          :rules="[
            (val) => val.length <= 6 || '',
            (val) => !!val || 'Obrigatório',
          ]"
        >
          <template v-slot:counter>
            <span>{{ calcula_texto(lclEmpresa.num_agencia, 6) }}</span>
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
          v-model="lclEmpresa.num_conta"
          bottom-slots
          :rules="[
            (val) => val.length <= 13 || '',
            (val) => !!val || 'Obrigatório',
          ]"
        >
          <template v-slot:counter>
            <span>{{ calcula_texto(lclEmpresa.num_conta, 13) }}</span>
          </template>
        </q-input>
        <q-input
          color="primary"
          input-class="text-black"
          dense
          label="Código de convênio com o banco"
          class="col-sm-3 q-px-xs"
          v-model="lclEmpresa.num_convenio"
          bottom-slots
          :rules="[
            (val) => val.length <= 20 || '',
            (val) => !!val || 'Obrigatório',
          ]"
        >
          <template v-slot:counter>
            <span>{{ calcula_texto(lclEmpresa.num_convenio, 20) }}</span>
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
            v-model="empresa.num_conta"
          / -->
        <q-select
          :options="listaInscricaoEmpresa"
          color="primary"
          dense
          :readonly="props.empresa ? true : false"
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
          v-model="lclEmpresa.cdg_documento"
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
          :readonly="props.empresa ? true : false"
          color="primary"
          input-class="text-black"
          dense
          label="Número do Documento"
          class="col-sm-4 q-px-xs"
          unmasked-value
          v-model="lclEmpresa.num_doc"
          bottom-slots
          :disable="lclEmpresa.cdg_documento == 0"
          :rules="
            lclEmpresa.cdg_documento != '0'
              ? [
                  (val) => val.length <= 14 || '',
                  (val) => !!val || 'Obrigatório',
                ]
              : []
          "
        >
          <template v-slot:counter>
            <span>{{ calcula_texto(lclEmpresa.num_doc, 14) }}</span>
          </template>
        </q-input>
        <q-input
          color="primary"
          input-class="text-black"
          dense
          label="Nome da empresa/pessoa"
          class="col-sm-6 q-px-xs"
          v-model="lclEmpresa.nome_empresa"
          @update:model-value="
            lclEmpresa.nome_empresa = lclEmpresa.nome_empresa.toUpperCase()
          "
          bottom-slots
          :rules="[
            (val) => val.length <= 30 || '',
            (val) => !!val || 'Obrigatório',
          ]"
        >
          <template v-slot:counter>
            <span>{{ calcula_texto(lclEmpresa.nome_empresa, 30) }}</span>
          </template>
        </q-input>
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
            v-model="lclEmpresa.cep"
            debounce="500"
            @update:model-value="pegaEndereco(lclEmpresa.cep)"
            :rules="[
              (val) => val.length <= 8 || '',
              (val) => val.length > 7 || '',
              (val) => !!val || 'Obrigatório',
            ]"
          >
            <template v-slot:counter>
              <span>{{ calcula_texto(lclEmpresa.cep, 8) }}</span>
            </template>
            <template v-slot:append>
              <q-spinner-hourglass v-if="showLoading" size="sm" />
            </template>
          </q-input>
          <q-input
            color="primary"
            input-class="text-black"
            dense
            label="Logradouro"
            class="col-sm-8 q-px-xs"
            v-model="lclEmpresa.logradouro"
            @update:model-value="
              lclEmpresa.logradouro = lclEmpresa.logradouro.toUpperCase()
            "
            bottom-slots
            :rules="[
              (val) => val.length <= 30 || '',
              (val) => !!val || 'Obrigatório',
            ]"
          >
            <template v-slot:counter>
              <span>{{ calcula_texto(lclEmpresa.logradouro, 30) }}</span>
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
            v-model="lclEmpresa.endereco_num"
            :rules="[
              (val) => val.length <= 7 || '',
              (val) => !!val || 'Obrigatório',
            ]"
          >
            <template v-slot:counter>
              <span>{{ calcula_texto(lclEmpresa.endereco_num, 5) }}</span>
            </template>
          </q-input>
          <q-input
            color="primary"
            input-class="text-black"
            dense
            label="Complemento"
            class="col-sm-4 q-px-xs"
            v-model="lclEmpresa.complemento"
            @update:model-value="
              lclEmpresa.complemento = lclEmpresa.complemento.toUpperCase()
            "
            bottom-slots
            :rules="[(val) => val.length <= 15 || '']"
          >
            <template v-slot:counter>
              <span>{{ calcula_texto(lclEmpresa.complemento, 15) }}</span>
            </template>
          </q-input>
          <q-select
            :options="lista_estados"
            color="primary"
            dense
            label="Estado"
            class="col-sm-1 q-px-xs bg-white"
            options-dense
            v-model="lclEmpresa.estado"
            :rules="[(val) => !!val || 'Obrigatório']"
          />
          <q-input
            color="primary"
            input-class="text-black"
            dense
            label="Cidade"
            class="col-sm-4 q-px-xs"
            v-model="lclEmpresa.cidade"
            @update:model-value="
              lclEmpresa.cidade = lclEmpresa.cidade.toUpperCase()
            "
            bottom-slots
            :rules="[(val) => val.length <= 20 || '']"
          >
            <template v-slot:counter>
              <span>{{ calcula_texto(lclEmpresa.cidade, 20) }}</span>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="flex justify-end col-12">
      <q-btn
        v-if="props.empresa"
        label="Excluir"
        color="white"
        unelevated
        no-caps
        class="q-px-xl ronded-windows q-mr-md text-black"
        @click="confirma_exclusao = true"
      />
      <q-btn
        type="submit"
        label="Salvar"
        color="primary"
        unelevated
        no-caps
        class="q-px-xl ronded-windows q-mr-md"
      />
    </div>
  </q-form>
  <q-dialog v-model="confirma_exclusao" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Confirma a exclusão?</span>
      </q-card-section>
      <div class="q-pa-sm q-gutter-x-sm">
        <q-btn
          label="Cancelar"
          color="white"
          unelevated
          no-caps
          class="q-px-xl ronded-windows text-black"
          v-close-popup
        />
        <q-btn
          type="submit"
          label="Excluir"
          color="primary"
          unelevated
          no-caps
          class="q-px-xl ronded-windows"
          @click="excluir"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { estados } from "src/tipos/cidades_estados";
import bancos from "src/tipos/bancos";
import { viaCEP } from "src/boot/axios";
import inscricaoEmpresa from "src/tipos/inscricaoEmpresa";
import { filtrar, calcula_texto } from "src/utils/diversos";
import { onMounted, ref, toRaw, defineEmits } from "vue";
import { adicionarEmpresaDB, removerEmpresaDB } from "src/database/main";
import { Notify } from "quasar";
import { actAdicionarEmpresa, actRemoverEmpresa } from "src/store/empresa";
const lclEmpresa = ref({
  cdg_banco: "",
  num_agencia: "",
  num_conta: "",
  num_convenio: "",
  cdg_documento: "",
  num_doc: "",
  nome_empresa: "",
  cdg_operacao: "",
  cdg_servico: "",
  cdg_lancamento: "",
  cep: "",
  logradouro: "",
  endereco_num: "",
  complemento: "",
  estado: "",
  cidade: "",
});
const showLoading = ref(false);
const lista_bancos = ref(bancos);
const lista_estados = ref(estados);
const listaInscricaoEmpresa = ref(inscricaoEmpresa);
const confirma_exclusao = ref(false);

async function pegaEndereco(cep) {
  if (cep.length == 8) {
    showLoading.value = true;
    const response = await viaCEP.get("/ws/" + cep + "/json/");
    showLoading.value = false;
    if (response.data) {
      lclEmpresa.value.logradouro = response.data.logradouro.toUpperCase();
      lclEmpresa.value.estado = response.data.uf.toUpperCase();
      lclEmpresa.value.cidade = response.data.localidade.toUpperCase();
    }
  }
}
async function salvar() {
  if (lclEmpresa.value.num_doc.length > 0) {
    lclEmpresa.value.id = lclEmpresa.value.num_doc;
  } else {
    lclEmpresa.value.id = crypto.randomUUID();
  }
  await actAdicionarEmpresa(structuredClone(toRaw(lclEmpresa.value)));
  emit("atualizar");
}
async function excluir() {
  await actRemoverEmpresa(lclEmpresa.value.id);
  emit("atualizar");
}
const props = defineProps(["empresa"]);
const emit = defineEmits(["atualizar"]);
onMounted(() => {
  if (props.empresa) lclEmpresa.value = props.empresa;
});
</script>
