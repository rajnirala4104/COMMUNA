import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "./constants";

export const http = axios.create({
   baseURL: API_BASE_URL,
   timeout: TIMEOUT,
});
