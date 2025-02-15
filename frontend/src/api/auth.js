import axios from "./axios"; // importa axios de axios.js
//import { gql, useMutation, useLazyQuery} from "@apollo/client";
import { gql, useMutation} from "@apollo/client";

//export const registerRequest = async (user) => axios.post(`/register`, user); // función que manda por método post a la ruta /register el usuario

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

export const useRegisterRequest = () => {
  const [registerUser] = useMutation (REGISTER_USER);
  return registerUser;
}

//export const loginRequest = async (user) => axios.post(`/login`, user); // función que manda por método post a la ruta /login el usuario

  const LOGIN_USER = gql`
  mutation loginUser($input: UserLogin!) {
    loginUser(input: $input) {
      username
      email
      password
      phone
      rol
    }
  }
`;

export const useLoginRequest = () => {
  const [loginUser] = useMutation (LOGIN_USER);
  return loginUser;
}

export const verifyTokenRequest = async () => axios.get(`/verify`); // función que manda por método get a la ruta /verify
/*
  const VERIFY_TOKEN = gql`
    query Query($id: String!) {
      getStoresByName(id: $id) {
      id
      }
    }
  `;

  export const useVerifyTokenRequest = () => {
    const [getData] = useLazyQuery(VERIFY_TOKEN);
    return getData;
      }
*/