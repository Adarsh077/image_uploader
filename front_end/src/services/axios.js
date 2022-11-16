import axios from "axios";

axios.defaults.baseURL = `http://${window.location.hostname}:8000`

axios.defaults.headers["x-access-token"] = localStorage.getItem("token") || "";

const reloadToken = (token, shouldRemember) => {
  axios.defaults.headers["x-access-token"] = token;
  if (shouldRemember) localStorage.setItem("token", token);
};

export { reloadToken };
export default axios;
