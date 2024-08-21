export function filtrar(val, update, store, nome) {
  let lista = structuredClone(store);
  if (val === "") {
    update(() => {
      return;
    });

    return lista;
  }
  update(() => {
    const needle = val.toLowerCase();
    lista = Object.values(
      lista.filter(
        (v) => v[nome].toLowerCase().indexOf(needle) > -1,
      ),
    );
  });
  return lista;
}
