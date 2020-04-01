import axios from "axios";

const api = axios.create({
  baseURL: "https://api-financial.herokuapp.com/"
});

export default api;
