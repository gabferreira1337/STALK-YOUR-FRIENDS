import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.secureme.me/api/v1/",
});

export const createSession = async (username, password) => {
  try {
    
    const response = await api.post("/auth/login", { username, password });
    return response.data; // Return the created user object
  } catch (error) {
    // Handle the error
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
    throw error; // Rethrow the error or handle it accordingly
  }
};

export const createUser = async (username, password) => {
  try {
    const response = await api.post("/auth/register", { username, password });
    return response.data; // Return the created user object
  } catch (error) {
    // Handle the error
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const submitCoord = async (lat, lng) => {
  const token =  sessionStorage.getItem("token");

  const data = {
    Latitude: parseFloat(lat),
    Longitude: parseFloat(lng),
  };

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post("/position/", data, config);

    alert("Localization added with sucess!!!");
  } catch (error) {
    alert("Couldn't add location");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getHistory = async (data_end, data_start) => {
  const token =  sessionStorage.getItem("token");

  const data = {
    end: "2023-07-01",
    start: "2021-07-01",
  };

  //console.log(typeof(token));

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post("/position/history", data, config);
    // console.log(response.data);

    return response;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getUserInfo = async () => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.get("/user/info", config);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const deletePosition = async (id) => {
  const token =  sessionStorage.getItem("token");

  //console.log(id);

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.delete(`/position/${id}`, config);
    //console.log(response.data);

    alert("Localization deleted sucessfully");

    // return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getFollowers = async () => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.get("/follower", config);
    // console.log(response.data);
    // return response;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const addFriend = async (id) => {
  const token =  sessionStorage.getItem("token");

  // console.log(typeof(id));

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post(
      "/follower/",
      { FollowerUserID: parseInt(id) },
      config
    );
    //console.log(response.data);

    alert("User " + id + " Added");

    // return response.data;
  } catch (error) {
    alert("Can't add user: " + id);
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};



export const unfollowfriend = async (id) => {
  const token =  sessionStorage.getItem("token");

  // console.log(typeof(id));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await api.delete(
      "/follower/",
      { data: { FollowerUserID: id }, ...config }
    );
    //console.log(response.data);

    alert("User " + id + " Unfollowed");

    // return response.data;
  } catch (error) {
    alert("Can't unfollow user: " + id + "Try again later");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};


export const fetchUsersHistory = async (id, data_start, data_end) => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    end: "2030-07-01",
    start: "2021-07-01",
    userID: id,
  };

  try {
    const response = await api.post("/position/history/user", data, config);

    // console.log(response.data.locations);

    // console.log(typeof(response.data.locations))

    return response.data.locations;
  } catch (error) {
    alert("Can't check user " + id + " history");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};





export const getsos = async (username) => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


  try {
    const response = await api.get(`/user/search/${username}`, config);

   

     //console.log(response.data.users)
   // console.log(response.data)
    return response.data.users;
  } catch (error) {
    alert("Can't check SOS state");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getfollowing = async () => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get("/follower/following", config);

    // console.log(response.data);

    // console.log(typeof(response.data.locations))

    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const sosMode = async (id) => {
  const token =  sessionStorage.getItem("token");

  // console.log(typeof(id));

  const config = {
    headers: { Authorization: `${token}` },
  };

  try {
    const response = await api.post(
      "/user/sos", null,
       config 
    );
    //console.log(response.data);

    if(response.status === 200){
      alert("SOS MODE ACTIVATED");
    }

    // return response.data;
  } catch (error) {
    alert("Can't activate SOS mode");
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};


export const getUsersName = async (username) => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(`/user/search/${username}`, config);

    //console.log(response.data);

    // console.log(typeof(response.data.locations))

    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};


export const getUsersList = async () => {
  const token =  sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get('/user/', config);

    //console.log(response.data);

    // console.log(typeof(response.data.locations))

    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

