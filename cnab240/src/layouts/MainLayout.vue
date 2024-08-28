<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr lFf" container class="pagina-full">
      <q-header class="bg-soft-grey text-dark">
        <div class="q-pa-sm q-pl-md row items-center">
          <q-item dense class="cursor-pointer non-selectable q-px-xs q-py-none">
            Gerador
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item to="/" clickable v-close-popup>
                  <q-item-section>Remessa</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>

          <q-item
            dense
            to="/config"
            class="q-ml-md cursor-pointer q-px-sm q-py-none"
            >Configurações</q-item
          >
          <q-item dense class="q-ml-md cursor-pointer q-px-xs q-py-none"
            >Sobre</q-item
          >
        </div>
      </q-header>

      <q-page-container class="bg-soft-grey">
        <router-view class="bg-soft-grey" />
      </q-page-container>
    </q-layout>
  </div>
</template>
<style lang="scss">
.pagina-full {
  min-height: calc(100vh);
}
</style>
