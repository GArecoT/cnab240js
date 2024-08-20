<template>
  <q-card flat square>
    <q-form @submit="headerDeArquivo(remessa)">
      <q-card-section
        class="q-px-xs row content-between items-between component-full"
      >
        <div class="row col-12">
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
              <span>{{ calcula_texto(remessa.num_agencia, 5) }}</span>
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
            label="Nome da empresa"
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
import bancos from "src/tipos/bancos";
import inscricaoEmpresa from "src/tipos/inscricaoEmpresa";
import headerDeArquivo from "src/geradores/headerDeArquivo";
import { onMounted, ref } from "vue";
import { geraHora } from "src/geradores/utils";

const remessa = ref({
  num_agencia: "",
  num_convenio: "",
  num_conta: "",
  num_doc: "",
  nome_empresa: "",
  num_lote: "0000",
  num_sequencial: "000000",
});

function calcula_texto(texto, max) {
  return texto.length + "/" + max;
}
onMounted(() => {
  geraHora();
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
