import API from "../../services/api";

export const loginUser = (data: any) => API.post("/auth/login", data);
export const registerUser = (data: any) => API.post("/auth/register", data);