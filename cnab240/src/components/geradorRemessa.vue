<template>
  <q-card flat square>
    <q-card-section
      class="bg-secondary text-white flex q-px-none content-center items-center q-pa-none"
    >
      <q-btn icon="arrow_back" color="dark" flat rounded></q-btn>
      <div class="text-dark">Gerador Remessa</div>
    </q-card-section>
    <q-form>
      <q-card-section
        class="q-px-xs row content-between items-between component-full"
      >
        <div class="row col-12">
          <q-select
            :options="bancos"
            rounded
            standout="bg-grey-2 text-dark"
            dense
            label="Banco"
            class="col-sm-3 q-px-xs text-dark"
            option-label="name"
            option-value="cdg"
            emit-value
            map-options
            options-dense
            v-model="remessa.cdg_banco"
          />
          <q-input
            rounded
            standout="bg-grey-2 text-black"
            dense
            input-class="text-black"
            label="Número Agência"
            class="col-sm-2 q-px-xs"
            mask="#####"
            fill-mask="0"
            reverse-fill-mask
            v-model="remessa.num_agencia"
          />
          <q-input
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
          />
          <q-input
            standout="bg-grey-2 text-black"
            input-class="text-black"
            rounded
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
            rounded
            label="Gerar"
            color="primary"
            unelevated
            class="q-px-xl"
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
