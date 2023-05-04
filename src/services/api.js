import axios from "axios";


export const api = axios.create({
  baseURL: "http://127.0.0.1:5001",

});

export const createSession = async (email, pass) => {

  return api.post("/auth/login", {email, pass});
};


export const getUsers = async() => {


  return api.get("/user");
}