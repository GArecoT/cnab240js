import { Notify } from "quasar";
import {
  adicionarEmpresaDB,
  getAllEmpresaDB,
  getEmpresaDB,
  removerEmpresaDB,
} from "src/database/main";

export async function actEmpresaGetAll() {
  if (localStorage.getItem("config/servidor") == "false") {
    return await getAllEmpresaDB();
  }
}
export async function actGetEmpresa(id) {
  if (localStorage.getItem("config/servidor") == "false") {
    return getEmpresaDB(id);
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
  }
}
