import { post } from "../axios";
import { Endpoints } from "../endpoints";

export function loginService(username, password) {
  return post(Endpoints.login, { username, password });
}

export function registerService(username, email, password) {
  return post(Endpoints.register, { username, email, password });
}

export function deleteAccountService() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 2000);
  });
}
