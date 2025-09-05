import axios from "axios";
import { clearToken, clearUser, getToken } from "utils/storage";

// const API_TIMEOUT_MS = 3000;
const API_URL = "http://localhost:8000";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Your API base URL
  // timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

// Add a request interceptor to attach the JWT token to each request
let abortController = new AbortController();
axiosInstance.interceptors.request.use(
  (config) => {
    config.signal = abortController.signal;
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      abortController.abort();
    }
    Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    if (response) {
      return { ok: true, ...response };
    }
  },
  (error) => {
    const err = error?.response?.data?.message || error.message || error;

    // Check if the user is still authenticated. If not reload page and clear its data
    if (
      (typeof err === "string" && err.toLowerCase() === "invalid token") ||
      error.status === 401
    ) {
      if (location.pathname !== "/login") {
        location.href = "/login"; // redirect to login page
        clearToken();
        clearUser();
      }
    }
    console.log(error);
    return { ok: false, err: err };
  }
);

export async function get(url, config = {}) {
  return axiosInstance.get(url, { ...config }).then((response) => response);
}

export async function post(url, data = {}, config = {}) {
  return axiosInstance.post(url, data, { ...config });
}

export async function patch(url, data = {}, config = {}) {
  return axiosInstance
    .patch(url, { ...data }, { ...config })
    .then((response) => response);
}

export async function postForm(url, form, config = {}) {
  return axiosInstance
    .postForm(url, form, {
      transformRequest: (formData) => formData,
      ...config,
    })
    .then((response) => response);
}

export async function del(url, config = {}) {
  return axiosInstance.delete(url, { ...config }).then((response) => response);
}
