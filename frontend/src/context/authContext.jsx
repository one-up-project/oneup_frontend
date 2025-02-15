import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { useLoginRequest, useRegisterRequest, verifyTokenRequest } from "../api/auth";
//import { useLoginRequest, useRegisterRequest, useVerifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie"; // npm install js-cookie

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {

  const registerRequest = useRegisterRequest(); //Transforma la función para que se pueda usar en el contexto
  const loginRequest = useLoginRequest(); //Transforma la función para que se pueda usar en el contexto
  //const verifyTokenRequest = useVerifyTokenRequest(); //Transforma la función para que se pueda usar en el contexto

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {

    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      rol: user.rol // Asegúrate de incluir este campo
    };

    try {
      const res = await registerRequest({ // llama a la función y manda por método post a la ruta /register el usuario 
        variables: {
          input: userData // <-- Clave "input" requerida
        }
      });
      //console.log(res.data.createUser);
      setUser(res.data.createUser);
      setIsAuthenticated(true);

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrors([errorMessage]); // Asigna un array
    }
  };

  const signin = async (user) => {

    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      rol: user.rol // Asegúrate de incluir este campo
    };

    try {
      const res = await loginRequest({ // llama a la función y manda por método post a la ruta /register el usuario 
        variables: {
          input: userData // <-- Clave "input" requerida
        }
      });
      //console.log(res.data.loginUser);
      setUser(res.data.loginUser);
      setIsAuthenticated(true);

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setErrors([errorMessage]); // Asigna un array
    }
  };

/**/
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
/*
    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      rol: user.rol // Asegúrate de incluir este campo
    };
*/
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
/*
        const res = await verifyTokenRequest({ 
          variables: {
            input: userData // <-- Clave "input" requerida
          }
        });
*/
        if (!res.data.createUser) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(res.data.createUser);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  //});
 }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
