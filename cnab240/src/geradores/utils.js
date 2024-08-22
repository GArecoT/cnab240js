export function preencheEspaco(texto, num) {
  let texto_temp = texto;
  while (texto_temp.length < num) {
    texto_temp = texto_temp + " ";
  }
  return texto_temp;
}
export function preencheZero(texto, num) {
  let texto_temp = texto;
  while (texto_temp.length < num) {
    texto_temp = "0" + texto_temp;
  }
  return texto_temp;
}
export function geraHora() {
  const date = new Date();
  const string = date.toLocaleTimeString("pt-br").replaceAll(":", "");
  return string;
}
export function geraData() {
  const date = new Date();
  const string = date.toLocaleDateString("pt-br").replaceAll("/", "");
  return string;
}
