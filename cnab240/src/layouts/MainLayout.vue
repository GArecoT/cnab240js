<template>
  <div class="q-pa-none">
    <q-layout view="lHh lpr lFf" container class="pagina-full">
      <q-header class="bg-soft-grey text-dark">
        <div class="q-pa-sm q-pl-md row items-center">
          <div class="cursor-pointer non-selectable">
            Gerador
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Remessa</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>

          <div class="q-ml-md cursor-pointer">Configurações</div>
          <div class="q-ml-md cursor-pointer">Sobre</div>
        </div>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<style lang="scss">
.pagina-full {
  min-height: calc(100vh);
}
</style>
