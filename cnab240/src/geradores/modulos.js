import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco } from "./utils";
export function geraControle(objeto) {
  const objeto_temp = structuredClone(objeto);

  return `${objeto_temp.cdg_banco}${objeto_temp.num_lote}${objeto_temp.cdg_registro}`;
}
export function geraServico() {
}
export function geraEnderecoEmpresa() {
}
export function geraEmpresa(objeto) {
  const objeto_temp = structuredClone(objeto);
  //Trata valores que precisam de espaço
  objeto_temp.num_convenio = preencheEspaco(objeto_temp.num_convenio, 20);
  objeto_temp.nome_empresa = preencheEspaco(objeto_temp.nome_empresa, 30);

  //Separar código verificador agência e conta
  objeto_temp.num_agencia = objeto_temp.num_agencia.replace("-", "");
  objeto_temp.num_conta = objeto_temp.num_conta.replace("-", "");

  return `${objeto_temp.cdg_documento}${objeto_temp.num_doc}${objeto_temp.num_convenio}${objeto_temp.num_agencia}${objeto_temp.num_conta}${objeto_temp.cdg_verificador_conta}${objeto_temp.nome_empresa}`;
}

export function geraArquivo(objeto) {
  const objeto_temp = structuredClone(objeto);

  //Gera hora e data
  objeto_temp.data = geraData();
  objeto_temp.hora = geraHora();

  //Pega padrão do banco
  objeto_temp.densidade_arquivo =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].densidade;
  objeto_temp.versao_layout =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].versao_layout;

  return `${objeto_temp.cdg_remessa_retorno}${objeto_temp.data}${objeto_temp.hora}${objeto_temp.num_sequencial}${objeto_temp.versao_layout}${objeto_temp.densidade_arquivo}`;
}
