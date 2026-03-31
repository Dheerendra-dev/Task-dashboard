import axios from "axios";
import { TASKS_API_BASE_URL, TASKS_API_TIMEOUT_MS } from "../constants/api";

const webService = axios.create({
  baseURL: TASKS_API_BASE_URL,
  timeout: TASKS_API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json"
  }
});

webService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response, message: errorMessage } = error || {};
    const { data } = response || {};

    const message =
      data?.message ||
      data?.error ||
      errorMessage ||
      "Request failed";

    return Promise.reject(new Error(message));
  }
);

export const webGet = (url, config = {}) => webService.get(url, config);

export const webPost = (url, data = {}, config = {}) => webService.post(url, data, config);

export const webPut = (url, data = {}, config = {}) => webService.put(url, data, config);

export const webDelete = (url, config = {}) => webService.delete(url, config);

export default webService;
