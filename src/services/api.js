import axios from "axios";


const locations = [];





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



export const submitCoord = async (lat, lng) => {

  const token = localStorage.getItem("token");

  const data = {
    "Latitude": lat,
    "Longitude": lng
  };
  

  console.log(token);

 const config = {
      headers: {Authorization: ` ${token}`}

  };

  console.log(lat, lng);
 
  const response = await api.post('/position', data,config)
  .then(response =>{
     console.log(response.data);
  })
  
.catch (error => {
  throw new Error(error.response.data); // Throw an error with the error message from the API
});
};






export const getHistory = async () => {

  const token = localStorage.getItem("token");

 

  console.log(token);

 const config = {
      headers: {Authorization: ` ${token}`}

  };

 
  const response = await api.post('/position/history',config)
  .then(response =>{
     console.log(response.data);
     response.data.locations.forEach(location => {
      locations.push(location);
  })
})
  
.catch (error => {
  throw new Error(error.response.data); // Throw an error with the error message from the API
});
};

export default locations;

