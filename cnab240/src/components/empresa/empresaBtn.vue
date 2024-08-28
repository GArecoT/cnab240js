<template>
  <div
    class="q-px-xs q-py-sm flex q-my-xs rounded-borders bg-lighter items-center justify-between cursor-pointer"
  >
    <div>
      <div class="flex items-center q-gutter-x-sm">
        <q-icon name="sym_r_person" size="md" />
        <div>
          <div class="titulo-conf-empresa">{{ props.nome }}</div>

          <div class="overflow-hidden-y" style="text-wrap: wrap">
            <span class="sub-conf-empresa q-pr-xs">{{
              bancos.filter((obj) => obj.cdg == props.cdg_banco)[0].name
            }}</span>
            <span class="sub-conf-empresa q-px-xs">
              {{
                inscricaoEmpresa.filter((obj) => obj.cdg == props.cdg_doc)[0]
                  .name
              }}
            </span>
            <span class="sub-conf-empresa q-px-xs">{{ props.num_doc }}</span>
          </div>
        </div>
      </div>
    </div>
    <q-icon
      name="sym_r_arrow_forward_ios"
      class="q-px-sm"
      color="grey-8"
      size="20px"
    />
  </div>
</template>
<script setup></script>
<style lang="scss">
.titulo-conf-empresa {
  font-size: 1rem;
  font-weight: bold;
}
.sub-conf-empresa {
  font-size: 0.8rem;
}
</style>
<script setup>
import bancos from "../../tipos/bancos.json";
import inscricaoEmpresa from "../../tipos/inscricaoEmpresa.json";
const props = defineProps(["nome", "cdg_banco", "cdg_doc", "num_doc"]);
</script>
