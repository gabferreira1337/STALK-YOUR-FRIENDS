import axios from "axios";


export const api = axios.create({
  baseURL: "http://127.0.0.1:5001",

});

export const createSession = async (username, password) => {

  return api.post("/auth/register", {username, password});
};


export const getUsers = async() => {


  return api.get("/user");
}