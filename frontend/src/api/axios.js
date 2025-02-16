import axios from "axios"; // npm install axios
import { API_URL } from "../config";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;
