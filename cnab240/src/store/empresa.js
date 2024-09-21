import { Notify } from "quasar";
import {
  adicionarEmpresaDB,
  getAllEmpresaDB,
  getEmpresaDB,
  removerEmpresaDB,
} from "src/database/main";

export async function actEmpresaGetAll() {
  if (localStorage.getItem("config/servidor") == "false") {
    console.log(await getAllEmpresaDB());
    return await getAllEmpresaDB();
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") + "api/listarEmpresas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("config/servidor_login"),
          senha: localStorage.getItem("config/servidor_senha"),
        }),
      },
    ).then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
}
export async function actGetEmpresa(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    return getEmpresaDB(id);
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") + "api/empresa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("config/servidor_login"),
          senha: localStorage.getItem("config/servidor_senha"),
          data: {
            id: id,
          },
        }),
      },
    ).then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res[0];
  }
}
export async function actRemoverEmpresa(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    removerEmpresaDB(id).then(
      Notify.create({
        type: "positive",
        message: "Empresa excluída com sucesso",
        position: "top-right",
      }),
    );
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") + "api/deletarEmpresa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("config/servidor_login"),
          senha: localStorage.getItem("config/servidor_senha"),
          data: { id: id },
        }),
      },
    ).then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
}
export async function actAdicionarEmpresa(data) {
  if (localStorage.getItem("config/servidor") == "false") {
    adicionarEmpresaDB(data).then(
      Notify.create({
        type: "positive",
        message: "Empresa salva com sucesso",
        position: "top-right",
      }),
    );
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") + "api/adicionarEmpresa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("config/servidor_login"),
          senha: localStorage.getItem("config/servidor_senha"),
          data: data,
        }),
      },
    ).then((response) => response.json())
      .then((data) => {
        return data;
      });
    return res;
  }
}
