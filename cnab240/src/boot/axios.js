import { boot } from "quasar/wrappers";
import axios from "axios";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
const viaCEP = axios.create({ baseURL: "https://viacep.com.br" });
viaCEP.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = viaCEP;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, viaCEP };
