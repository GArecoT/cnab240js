import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco, preencheZero } from "./utils";

export function geraControle(objeto) {
  const objeto_temp = structuredClone(objeto);

  return `${objeto_temp.cdg_banco}${objeto_temp.num_lote}${objeto_temp.cdg_registro}`;
}
export function geraServico(objeto) {
  const objeto_temp = structuredClone(objeto);

  objeto_temp.layout_lote =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].layout_lote;

  return `${objeto_temp.cdg_operacao}${objeto_temp.cdg_servico}${objeto_temp.cdg_lancamento}${objeto_temp.layout_lote}`;
}

export function geraEnderecoEmpresa(objeto) {
  const objeto_temp = structuredClone(objeto);

  //Trata valores que precisam de espaço
  objeto_temp.logradouro = preencheEspaco(objeto_temp.logradouro, 30);
  objeto_temp.complemento = preencheEspaco(objeto_temp.complemento, 15);
  objeto_temp.cidade = preencheEspaco(objeto_temp.cidade, 20);

  //Trata valores que precisam de zero
  objeto_temp.endereco_num = preencheZero(objeto_temp.endereco_num, 5);

  return `${objeto_temp.logradouro}${objeto_temp.endereco_num}${objeto_temp.complemento}${objeto_temp.cidade}${objeto_temp.cep}${objeto_temp.estado}`;
}

export function geraEmpresa(objeto) {
  const objeto_temp = structuredClone(objeto);
  //Trata valores que precisam de espaço
  objeto_temp.num_convenio = preencheEspaco(objeto_temp.num_convenio, 20);
  objeto_temp.nome_empresa = preencheEspaco(objeto_temp.nome_empresa, 30);

  //Trata valores que precisam de zero
  objeto_temp.num_agencia = preencheZero(objeto_temp.num_agencia, 6);
  objeto_temp.num_conta = preencheZero(objeto_temp.num_conta, 13);
  objeto_temp.num_doc = preencheZero(objeto_temp.num_doc, 14);

  //Separar código verificador agência e conta

  return `${objeto_temp.cdg_documento}${objeto_temp.num_doc}${objeto_temp.num_convenio}${
    geraContaCorrente(objeto_temp)
  }${objeto_temp.nome_empresa}`;
}

export function geraFavorecido(objeto) {
  const objeto_temp = structuredClone(objeto);

  objeto_temp.nome_favorecido = preencheEspaco(objeto_temp.nome_favorecido);

  return `${objeto_temp.cdg_camara_favorecido}${objeto_temp.cdg_banco_favorecido}${
    geraContaCorrente({
      num_agencia: objeto_temp.num_agencia_favorecido,
      num_conta: objeto_temp.num_conta_favorecido,
      cdg_verificador_conta: objeto_temp.cdg_verificador_conta,
    })
  }${objeto_temp.nome_favorecido}`;
}
export function geraCredito(objeto) {
  const objeto_temp = structuredClone(objeto);

  objeto_temp.num_doc_empresa = preencheZero(objeto_temp.num_doc_empresa, 20);
  objeto_temp.valor_pagamento = preencheZero(objeto_temp.valor_pagamento, 13);
  //NOTE: Manda quantidade da moeda como 0 provisóriamente
  //NOTE: Manda data real como 0 provisóriamente
  //NOTE: Manda código do banco como ' ' provisóriamente

  return `${objeto_temp.num_doc_empresa}${objeto_temp.data_pagamento}${objeto_temp.cdg_moeda}${
    preencheZero("", 15)
  }${objeto_temp.valor_pagamento}${preencheEspaco("", 20)}${
    preencheZero("", 8)
  }${objeto_temp.valor_pagamento}`;
}

export function geraDetalhePix(num_doc, cdg_banco, cdg_tipo_conta) {
  const ispb = bancos.filter((obj) => obj.cdg == cdg_banco)[0].ispb;
  console.log("ispb", ispb);

  return `${preencheZero(num_doc, 14)}${
    preencheZero(ispb, 8)
  }${cdg_tipo_conta}`;
}

export function geraContaCorrente(objeto) {
  const objeto_temp = structuredClone(objeto);

  objeto_temp.num_agencia = preencheZero(objeto_temp.num_agencia, 6);
  objeto_temp.num_conta = preencheZero(objeto_temp.num_conta, 13);

  return `${objeto_temp.num_agencia}${objeto_temp.num_conta}${objeto_temp.cdg_verificador_conta}`;
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
