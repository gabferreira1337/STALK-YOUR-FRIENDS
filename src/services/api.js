import axios from "axios";


//const URL = "http://127.0.0.1:5001"

export const api = axios.create({
  baseURL: "https://api.secureme.me/api/v1/",

});

export const createSession = async (username, password) => {

  try {
    //console.log("hellodada");
    const response = await api.post('/auth/login', {username, password});
    return response.data; // Return the created user object
  } catch (error) {
    // Handle the error
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }

};


export const getUsers = async() => {


  try {
    const response = await api.get("/");
    return response.data;

  } catch (error) {

    console.error("Error fetching users:", error);
    throw error; // Rethrow the error or handle it accordingly
  }
};


export const createUser = async (username, password) => {
  try {
    const response = await api.post('/auth/register', {username, password});
    return response.data; // Return the created user object
  } catch (error) {
    // Handle the error
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

