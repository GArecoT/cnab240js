import bancos from "src/tipos/bancos";
import { geraData, geraHora, preencheEspaco } from "./utils";
import {
  geraArquivo,
  geraControle,
  geraEmpresa,
  geraEnderecoEmpresa,
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
  const lote = geraEnderecoEmpresa(objeto);

  console.log(lote);
}
