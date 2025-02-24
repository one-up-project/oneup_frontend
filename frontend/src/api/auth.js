import axios from "./axios"; // importa axios de axios.js
//import { gql, useMutation, useLazyQuery} from "@apollo/client";
import { gql, useMutation} from "@apollo/client";

//export const registerRequest = async (user) => axios.post(`/register`, user); // función que manda por método post a la ruta /register el usuario
// esto trae los campos que le da el backend al api gateway
const REGISTER_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      username
      email
      password
      phone
      rol
      lat
      long
    }
  }
`;

export const useRegisterRequest = () => {
  const [registerUser] = useMutation (REGISTER_USER);
  return registerUser;
}

const UPDATE_USER = gql`
mutation updateUser($input: UserUpdate!) {
  updateUser(input: $input) {
    id
    username
    email
    password
    phone
    rol
    lat
    long
  }
}
`;

export const useUpdateRequest = () => {
const [updateUser] = useMutation (UPDATE_USER);
return updateUser;
}

//export const loginRequest = async (user) => axios.post(`/login`, user); // función que manda por método post a la ruta /login el usuario

  const LOGIN_USER = gql`
  mutation loginUser($input: UserLogin!) {
    loginUser(input: $input) {
      id
      username
      email
      password
      phone
      rol
      lat
      long
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