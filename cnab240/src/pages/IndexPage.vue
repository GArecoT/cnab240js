<template>
  <span class="titulo q-ma-sm">CNAB 240 Plus Ultra Premium Deluxe</span>
  <div class="row q-mt-lg q-px-sm index-main">
    <div class="col-6 q-pr-sm">
      <div class="titulo">Configurações</div>
      <q-btn
        label="Configurar Servidor"
        color="primary"
        unelevated
        no-caps
        to="/config"
        class="q-px-xl ronded-windows q-mt-sm"
      />
    </div>
    <div class="col-6 q-pl-sm">
      <div class="titulo">Funções</div>
      <q-btn
        label="Gerar Remessa"
        color="primary"
        unelevated
        no-caps
        to="/remessa"
        class="q-px-xl ronded-windows q-mt-sm"
      />
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss">
.index-main {
  min-width: 100vw;
  min-height: calc(100vh - 82px);
}
</style>
