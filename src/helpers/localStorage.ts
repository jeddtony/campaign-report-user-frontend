const keyWord: string = "PREACHING_CAMPAIGN";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(keyWord + "_TOKEN");
  }
  return '';
  
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
  localStorage.setItem(keyWord + "_TOKEN", token);
  }
};