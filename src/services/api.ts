import axios from "axios";

const api = axios.create({
  baseURL: "https://app.ntaaccounting.com",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export default api;