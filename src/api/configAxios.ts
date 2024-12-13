import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
const API_TIMEOUT = 10000;
// Configuración base de axios
export const api = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  // Prevenir errores de CORS
  withCredentials: true,
  // Validar status
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});


