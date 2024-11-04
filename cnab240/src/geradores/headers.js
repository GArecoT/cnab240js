import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco, preencheZero } from "./utils";
import {
  geraArquivo,
  geraControle,
  geraCredito,
  geraDetalhePix,
  geraEmpresa,
  geraEnderecoEmpresa,
  geraFavorecido,
  geraServico,
} from "./modulos";

export function geraHeaderArquivo(
  objeto,
) {
  const objeto_temp = structuredClone(objeto);

  //Pega info do banco
  objeto_temp.nome_banco =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].nome_empresa;
  objeto_temp.reservado_banco =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0].reservado_banco;
  objeto_temp.reservado_empresa =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0]
      .reservado_empresa;

  //Trata valores que precisam de espaço
  objeto_temp.nome_banco = preencheEspaco(objeto_temp.nome_banco, 30);
  objeto_temp.reservado_banco = preencheEspaco(objeto_temp.reservado_banco, 20);
  objeto_temp.reservado_empresa = preencheEspaco(
    objeto_temp.reservado_empresa,
    20,
  );

  const header = `${geraControle({ ...objeto_temp, cdg_registro: 0 })}${preencheEspaco("", 9)
    }${geraEmpresa(objeto_temp)}${objeto_temp.nome_banco}${preencheEspaco("", 10)
    }${geraArquivo({ ...objeto_temp, cdg_remessa_retorno: 1 })}${objeto_temp.cdg_lancamento == "45" || objeto_temp.cdg_lancamento == "47"
      ? "PIX"
      : preencheEspaco("", 3)
    }${objeto_temp.reservado_banco}${objeto_temp.reservado_empresa}${preencheEspaco("", 26)
    }`;

  console.log(header);
  console.log(header.length);
  console.log(objeto_temp);

  return header;
}

export function geraHeaderLote(objeto) {
  const objeto_temp = structuredClone(objeto);
  console.log(objeto);
  console.log(bancos);

  objeto_temp.indicativo_forma_pagamento =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0]
      .indicativo_forma_pagamento;

  const lote = `${geraControle({ ...objeto_temp, cdg_registro: 1 })}${geraServico(objeto_temp)
    }${preencheEspaco("", 1)}${geraEmpresa(objeto_temp)}${preencheEspaco("", 40) /*Mensagem 1. Mudar futuramente*/
    }${geraEnderecoEmpresa(objeto_temp)
    }${objeto_temp.indicativo_forma_pagamento}${preencheEspaco("", 6)}${preencheEspaco("", 10) /*Ocorrencias. mudar futuramente*/
    }`;
  console.log(objeto_temp);
  console.log(lote);
  return lote;
}
export function geraDetalheA(objeto) {
  const objeto_temp = structuredClone(objeto);

  //NOTE: Campo informações muda dependendo do contexto (G031)

  //Caso seja PIX
  if (
    objeto_temp.cdg_lancamento == "45" || objeto_temp.cdg_lancamento == "47"
  ) {
    return `${geraControle(objeto_temp)}${geraServico(objeto_temp)}${geraFavorecido(objeto_temp)
      }${geraCredito(objeto_temp)}${geraDetalhePix(
        objeto_temp.num_doc,
        objeto_temp.cdg_banco,
        objeto_temp.cdg_tipo_conta,
      )
      }${preencheZero("", 2)}${preencheZero(objeto_temp.cdg_finalidade_doc_ted),
      5}`;
  }
}
