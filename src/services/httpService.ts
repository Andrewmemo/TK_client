import axios from "axios";

axios.defaults.headers.common["x-tk-login-token"] = localStorage.getItem(
  "token"
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
