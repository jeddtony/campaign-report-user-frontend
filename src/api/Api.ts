'use client';

import axios, {AxiosInstance} from "axios";
import { getToken } from "../helpers/localStorage";

const apiUrl: string = "https://test.ecofitnesshub.com/api";
// const apiUrl: string = "http://localhost:8000/api";
// const apiUrl: string = "https://b47b-102-89-47-186.ngrok-free.app/api";

let token = getToken();
const headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    // "Content-Type": "application/json",
    Authorization: "Bearer " + getToken()
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

  instance.interceptors.response.use(
    function(response) {
      // let finalResponse = { ...response, status: 200, statusCode: 200 };
      return response;
    },
    function(error) {
      // //console.log(error.response.status);
  
      // //console.log(error.response.data.data.diagnostics.message);
      if (error?.response?.status === 401 || error?.response?.status === 400) {
        return redirectToLogin();
      } else {
        let finalResponse = {
          ...error,
          status: error?.response?.status,
          statusCode: error?.response?.status,
        };
        return finalResponse;
      }
      //console.log(error);
    }
  );

  function redirectToLogin() {
    let publicUrl = process.env.PUBLIC_URL?? '';
    let loginPageUrl = null;
    loginPageUrl = publicUrl + "/login";
  
    let origin = window.location.origin;
    if (window.location.origin === origin + loginPageUrl) return;
    window.location.href = loginPageUrl;
  }

  export async function login(data: any): Promise<any> {
    const result = await loginInstance.post("/login", data);
    // console.log(result);
    return result.data;
    // return processResult(result);
  }

  export async function postReport(data: any): Promise<any> {
    const result = await instance.post("/report/add-report", data);
    return result.data;
  }

  export async function postStudent(data: any): Promise<any> {
    const result = await instance.post("/report/add-student", data);
    return result.data;
  }

  export async function postExperience(data: any): Promise<any> {
    const result = await instance.post("/report/add-experience", data);
    return result.data;
  }

  export async function getStudents(): Promise<any> {
    const result = await instance.get("/report/view-student?user_type=user");
    return result.data.data;
  }

  export async function getOneStudent(id:string): Promise<any> {
    const result = await instance.get("/report/view-student/" + id);
    return result.data.data;
  }

  export async function getDashboard(): Promise<any> {
    const result = await instance.get("/report/view-dashboard?user_type=user");
    return result.data.data;
  }

  export async function getExperiences(): Promise<any> {
    const result = await instance.get("/report/view-experiences?user_type=user");
    return result.data.data;
  }

  export async function getProfile(): Promise<any> {
    const result = await instance.get("/me");
    return result.data.data;
  }

  export async function getSchedule(date: string|null): Promise<any> {
    const result = await instance.get("/report/view-schedules?date=" + date);
    return result.data.data;
  }