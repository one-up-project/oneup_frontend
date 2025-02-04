import axios from "./axios"; // importa axios de axios.js

export const registerRequest = async (user) =>
  axios.post(`/register`, user); // manda por método post a la ruta /auth/register el usuario

export const loginRequest = async (user) => axios.post(`/login`, user); // manda por método post a la ruta /auth/login el usuario

export const verifyTokenRequest = async () => axios.get(`/verify`); // manda por método get a la ruta /auth/verify
