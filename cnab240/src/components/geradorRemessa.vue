<template>
  <q-card flat square>
    <q-form>
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
          />
          <q-input
            dense
            color="primary"
            input-class="text-black"
            label="Número Agência"
            class="col-sm-2 q-px-xs"
            mask="#####"
            fill-mask="0"
            reverse-fill-mask
            v-model="remessa.num_agencia"
          />
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
          />
          <q-input
            color="primary"
            input-class="text-black"
            dense
            label="Código de convênio com o banco"
            class="col-sm-3 q-px-xs"
            v-model="remessa.num_convenio"
          />
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
        </div>
        <div class="flex justify-end col-12">
          <q-btn
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
import bancos from "src/router/tipos/bancos";
import { ref } from "vue";

const remessa = ref({});
</script>
<style lang="scss">
.q-field__native {
  color: #000 !important;
}
.q-field__append {
  color: #000 !important;
}
</style>
