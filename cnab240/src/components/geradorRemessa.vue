<template>
  <q-card flat square>
    <q-card-section
      class="bg-secondary text-white flex q-px-none content-center items-center"
    >
      <q-btn icon="arrow_back" flat rounded></q-btn>
      <div class="text-h6">Gerador Remessa</div>
    </q-card-section>
    <q-form>
      <q-card-section class="q-px-xs">
        <div class="row">
          <q-select
            :options="bancos"
            rounded
            standout
            dense
            label="Banco"
            class="col-sm-3 q-px-xs"
            option-label="name"
            option-value="cdg"
            emit-value
            map-options
            options-dense
          />
          <q-input
            rounded
            standout
            dense
            label="Número Agência"
            class="col-sm-2 q-px-xs"
            mask="00000"
            reverse-fill-mask
          />
          <q-input
            rounded
            standout
            dense
            label="Número da Conta"
            class="col-sm-4 q-px-xs"
          />
        </div>
        <div class="flex justify-end">
          <q-btn rounded label="Gerar" color="accent" unelevated />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import bancos from "src/router/tipos/bancos";
</script>
<style lang="scss"></style>
