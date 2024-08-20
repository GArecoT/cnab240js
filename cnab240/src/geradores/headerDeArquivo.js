import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco } from "./utils";

export default async function (
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
  objeto_temp.reservado_banco =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].reservado_banco;
  objeto_temp.reservado_empresa =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0]
      .reservado_empresa;

  //Gera data e hora
  objeto_temp.data = await geraData();
  objeto_temp.hora = await geraHora();

  //Trata valores que precisam de espaço
  objeto_temp.num_convenio = preencheEspaco(objeto_temp.num_convenio, 20);
  objeto_temp.nome_empresa = preencheEspaco(objeto_temp.nome_empresa, 30);
  objeto_temp.nome_banco = preencheEspaco(objeto_temp.nome_banco, 30);
  objeto_temp.reservado_banco = preencheEspaco(objeto_temp.reservado_banco, 20);
  objeto_temp.reservado_empresa = preencheEspaco(
    objeto_temp.reservado_empresa,
    20,
  );

  //Separar código verificador agência e conta
  objeto_temp.num_agencia = objeto_temp.num_agencia.replace("-", "");
  objeto_temp.num_conta = objeto_temp.num_conta.replace("-", "");

  const header = `${objeto_temp.cdg_banco}${objeto_temp.num_lote}0${
    preencheEspaco("", 9)
  }${objeto_temp.cdg_documento}${objeto_temp.num_doc}${objeto_temp.num_convenio}${objeto_temp.num_agencia}${objeto_temp.num_conta}${objeto_temp.cdg_verificador_conta}${objeto_temp.nome_empresa}${objeto_temp.nome_banco}${
    preencheEspaco("", 10)
  }1${objeto_temp.data}${objeto_temp.hora}${objeto_temp.num_sequencial}${objeto_temp.versao_layout}${objeto_temp.densidade_arquivo}${objeto_temp.reservado_banco}${objeto_temp.reservado_empresa}${
    preencheEspaco("", 29)
  }`;

  console.log(header);
  console.log(header.length);
  console.log(objeto_temp);

  return header;
}
