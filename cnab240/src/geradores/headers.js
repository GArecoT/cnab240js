import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco, preencheZero } from "./utils";
import {
  geraArquivo,
  geraControle,
  geraEmpresa,
  geraEnderecoEmpresa,
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
    }${geraArquivo({ ...objeto_temp, cdg_remessa_retorno: 1 })
    }${objeto_temp.reservado_banco}${objeto_temp.reservado_empresa}${preencheEspaco("", 29)
    }`;

  console.log(header);
  console.log(header.length);
  console.log(objeto_temp);

  return header;
}

export function geraHeaderLote(objeto) {
  const objeto_temp = structuredClone(objeto);

  objeto_temp.indicativo_forma_pagamento =
    bancos.filter((obj) => obj.cdg == objeto_temp.cdg_banco)[0]
      .indicativo_forma_pagamento;

  const lote = `${geraControle(objeto_temp)}${geraServico(objeto_temp)}${preencheEspaco("", 1)
    }${geraEmpresa(objeto_temp)}${preencheEspaco("", 40) /*Mensagem 1. Mudar futuramente*/
    }${geraEnderecoEmpresa(objeto_temp)
    }${objeto_temp.indicativo_forma_pagamento}${preencheEspaco("", 6)}${preencheEspaco("", 10) /*Ocorrencias. mudar futuramente*/
    }`;
  console.log(objeto_temp);
  console.log(lote);
}
