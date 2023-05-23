import axios from "axios";



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
    "Latitude": parseFloat(lat),
    "Longitude": parseFloat(lng)

  };

  
 const config = {
      headers: {Authorization: token}

  };


  try {
 
  const response = await api.post('/position', data,config);

  alert("Localization added with sucess!!!");

 
  
  }catch(error)  {
    alert("Couldn't add location");
  throw new Error(error.response.data); // Throw an error with the error message from the API
  
};
};


export const getHistory = async (data_end,data_start) => {

  const token = localStorage.getItem("token");

  
  const data = {

    end : "2023-07-01",
    start : "2021-07-01",
  }

 

  //console.log(typeof(token));

 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.post('/position/history',data, config);
   // console.log(response.data);
    
   
  
     return response;
    
    }

   catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}



export const getUserInfo = async () => {

  const token = localStorage.getItem("token");


 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.get('/user/info',config);
   // console.log(response.data);

     return response.data;
    
    }

   catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}


export const deletePosition = async (id) => {

  const token = localStorage.getItem("token");

  console.log(id);

 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.delete(`/position/${id}`,config);
    //console.log(response.data);

    alert('Localization deleted sucessfully');

    // return response.data;
    
    }

   catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}


export const getFollowers = async () => {

  const token = localStorage.getItem("token");

 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.get('/follower',config);
   // console.log(response.data);
    // return response;
    }

   catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}




export const addFriend = async (id) => {

  const token = localStorage.getItem("token");

 // console.log(typeof(id));

 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.post('/follower',{FollowerUserID: parseInt(id)},config);
    //console.log(response.data);

    alert("User " + id + " Added");

  

    // return response.data;
    
    }

   catch (error) {
    alert("Can't add user: " + id);
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}


export const unfollowfriend = async (id) => {

  const token = localStorage.getItem("token");

// console.log(token);

 const config = {
      headers: {Authorization: token}

  };


  try {
    const response = await api.delete('/follower',{FollowerUserID: parseInt(id)},config);
    //console.log(response.data);

    alert("User " + id + " Unfollowed");

  

    // return response.data;
    
    }

   catch (error) {
    alert("Can't unfollow user: " + id + "Try again later");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }


}







