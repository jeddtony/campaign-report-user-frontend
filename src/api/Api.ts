import axios, {AxiosInstance} from "axios";
import { getToken } from "../helpers/localStorage";

const apiUrl: string = "https://test.ecofitnesshub.com/api";

const headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
    Authorization: "Bearer " + getToken(),
  };

const loginHeaders: {
    Accept: string;
    "Content-Type": string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers,
  });

  const loginInstance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 50000,
    headers: loginHeaders,
  });

  export async function login(data: any): Promise<any> {
    const result = await loginInstance.post("/login", data);
    // console.log(result);
    return result.data;
    // return processResult(result);
  }