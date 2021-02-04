import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "http://ec2-3-7-254-31.ap-south-1.compute.amazonaws.com:8000";

axios.defaults.headers["x-access-token"] = localStorage.getItem("token") || "";

const reloadToken = (token, shouldRemember) => {
  axios.defaults.headers["x-access-token"] = token;
  if (shouldRemember) localStorage.setItem("token", token);
};

export { reloadToken };
export default axios;
