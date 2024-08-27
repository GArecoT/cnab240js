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
export function calcula_texto(texto, max) {
  return texto.length + "/" + max;
}
export function debounce(func, delay) {
  let timeout = null;
  return (...args) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}
export function exportarTXT(obj) {
  const blob = new Blob([obj], {
    type: "text/plain",
  });
  return URL.createObjectURL(blob);
}
