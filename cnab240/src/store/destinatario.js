import { Notify } from "quasar";
import {
  adicionarDestinatarioDB,
  getAllDestinatarioDB,
  getDestinatarioDB,
  removerDestinatarioDB,
} from "src/database/main";

export async function actDestinatarioGetAll() {
  if (localStorage.getItem("config/servidor") == "false") {
    console.log(getAllDestinatarioDB());
    return await getAllDestinatarioDB();
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") +
        "api/listarFavorecidos",
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
export async function actGetDestinatario(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    return getDestinatarioDB(id);
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") + "api/favorecido",
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
    return res[0];
  }
}
export async function actRemoverDestinatario(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    removerDestinatarioDB(id).then(
      Notify.create({
        type: "positive",
        message: "Destinatario excluído com sucesso",
        position: "top-right",
      }),
    );
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") +
        "api/deletarFavorecido",
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
export async function actAdicionarDestinatario(data) {
  if (localStorage.getItem("config/servidor") == "false") {
    adicionarDestinatarioDB(data).then(
      Notify.create({
        type: "positive",
        message: "Destinatario salvo com sucesso",
        position: "top-right",
      }),
    );
  } else {
    const res = await fetch(
      localStorage.getItem("config/servidor_endereco") +
        "api/adicionarFavorecido",
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
