const keyWord: string = "PREACHING_CAMPAIGN";

export const getToken = () => {
  return localStorage.getItem(keyWord + "_TOKEN");
};

export const setToken = (token: string) => {
  localStorage.setItem(keyWord + "_TOKEN", token);
};