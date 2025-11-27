import { envConfigs } from "@configs/index";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: envConfigs.API_URL,
  withCredentials: true,
});
