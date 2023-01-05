import axios from "axios";
const BASE_URL = 'link del api';
export const instance = axios.create({
  baseURL: BASE_URL,
});