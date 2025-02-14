import axios from "./axios"; // importa axios de axios.js
import { gql, useMutation  } from "@apollo/client";

const REGISTER_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      username
      email
      password
      phone
      rol 
    }
  }
`;

//export const registerRequest = async (user) => axios.post(`/register`, user); // función que manda por método post a la ruta /register el usuario

export const useRegisterRequest = () => {
  const [registerUser] = useMutation (REGISTER_USER);
  return registerUser;
}

export const loginRequest = async (user) => axios.post(`/login`, user); // función que manda por método post a la ruta /login el usuario

export const verifyTokenRequest = async () => axios.get(`/verify`); // función que manda por método get a la ruta /verify
