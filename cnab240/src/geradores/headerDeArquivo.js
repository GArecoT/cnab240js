import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco } from "./utils";

export default function (
  objeto,
) {
  const objeto_temp = structuredClone(objeto);

  //Pega info do banco
  objeto_temp.nome_banco =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].nome_empresa;
  objeto_temp.densidade_arquivo =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].densidade;
  objeto_temp.versao_layout =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].versao_layout;

  //Gera data e hora
  objeto_temp.data = geraData();
  objeto_temp.hora = geraHora();

  //Trata valores que precisam de espaço
  objeto_temp.num_convenio = preencheEspaco(objeto_temp.num_convenio, 20);
  objeto_temp.nome_empresa = preencheEspaco(objeto_temp.nome_empresa, 30);
  objeto_temp.nome_banco = preencheEspaco(objeto_temp.nome_banco, 30);

  //Separar código verificador agência e conta

  const header =
    `${objeto_temp.cdg_banco}${objeto_temp.num_lote}0${"         "}${objeto_temp.cdg_documento}${objeto_temp.num_doc}${objeto_temp.num_convenio}${objeto_temp.num_agencia}`;
  console.log(header);

  console.log(objeto_temp);
}
