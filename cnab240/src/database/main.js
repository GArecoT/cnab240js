export async function existeDB(dbName) {
  const isExisting = (await window.indexedDB.databases()).map((db) => db.name)
    .includes(dbName);

  return isExisting;
}
export function criarDB() {
  const request = indexedDB.open("BD", 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore("Empresas", { keyPath: "id" });
    db.createObjectStore("Destinatarios", {
      keyPath: "id",
    });
    db.createObjectStore("Remessas", {
      keyPath: "id",
    });
  };
}

//Empresas
export function adicionarEmpresaDB(data) {
  console.log(data);
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open("BD", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("Empresas", "readwrite");
      const objectStore = transaction.objectStore("Empresas");

      const request = objectStore.add(data);

      request.onsuccess = (event) => resolve(event.target.result); // Data added successfully
      request.onerror = (event) => reject(event);
    };
  });
}

export function getAllEmpresaDB() {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open("BD", 1);

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("Empresas", "readwrite");
      const objectStore = transaction.objectStore("Empresas");

      const request = objectStore.getAll();

      request.onsuccess = (event) => resolve(event.target.result); // Data added successfully
      request.onerror = (event) => reject(event);
    };
  });
}
