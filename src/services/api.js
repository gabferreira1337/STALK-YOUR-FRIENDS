import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.secureme.me/api/v1/",
});

export const createSession = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
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
  const token = sessionStorage.getItem("token");

  const data = {
    Latitude: parseFloat(lat),
    Longitude: parseFloat(lng),
  };

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post("/position/", data, config);
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getHistory = async (data_end, data_start) => {
  const token = sessionStorage.getItem("token");

  const data = {
    end: "2023-07-01",
    start: "2021-07-01",
  };

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post("/position/history", data, config);

    return response;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getUserInfo = async () => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.get("/user/info", config);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const deletePosition = async (id) => {
  const token = sessionStorage.getItem("token");

  //console.log(id);

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.delete(`/position/${id}`, config);
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const getFollowers = async () => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.get("/follower", config);
    // return response;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const addFriend = async (id) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await api.post(
      "/follower/",
      { FollowerUserID: parseInt(id) },
      config
    );

    // return response.data;
  } catch (error) {
    throw new Error(error.response.data); // Throw an error with the error message from the API
  }
};

export const unfollowfriend = async (id) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await api.delete("/follower/", {
      data: { FollowerUserID: id },
      ...config,
    });
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const fetchUsersHistory = async (id) => {
  const token = sessionStorage.getItem("token");

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

    return response.data.locations;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getsos = async (username) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(`/user/search/${username}`, config);

    return response.data.users;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getfollowing = async () => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get("/follower/following", config);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const sosMode = async (id) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `${token}` },
  };

  try {
    const response = await api.post("/user/sos", null, config);
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUsersName = async (username) => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get(`/user/search/${username}`, config);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUsersList = async () => {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get("/user/", config);

    return response.data.users;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
