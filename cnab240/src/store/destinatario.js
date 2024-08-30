import { Notify } from "quasar";
import {
  adicionarDestinatarioDB,
  getAllDestinatarioDB,
  getDestinatarioDB,
  removerDestinatarioDB,
} from "src/database/main";

export async function actDestinatarioGetAll() {
  if (localStorage.getItem("config/servidor") == "false") {
    return await getAllDestinatarioDB();
  }
}
export async function actGetDestinatario(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    return getDestinatarioDB(id);
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
  }
}
