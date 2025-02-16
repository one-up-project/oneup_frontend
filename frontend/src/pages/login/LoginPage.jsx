import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom"; // npm install react-router-dom
import { useForm } from "react-hook-form"; // npm install react-hook-form
import { loginSchema } from "../../schemas/auth"; // mensajes de errores
import { zodResolver } from "@hookform/resolvers/zod"; // npm install @hookform/resolvers
import "./login.css";

function LoginPage() {
  const {
    signin,
    errors: loginErrors,
    isAuthenticated,
    user,
    logout,
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signin(data);
  }; // consulta las credenciales del usuario

  //console.log(isAuthenticated);

  useEffect(() => {
    const redirectUser = async () => {
      if (isAuthenticated) {
/**/ console.log(user.rol);
        switch (user.rol) {
          case "client":
            return navigate("/");
          case "restaurant":
            return navigate("/restaurant");
          default:
            return logout();
          //return console.log("No tiene un rol asignado");
        }
      
      }
    };
    redirectUser();
  }, [isAuthenticated, user, navigate, logout]);

  return (
    <div className="container_login">
      <section className="section_login">
        {loginErrors.length > 0 && (
          <div className="mb-4">
            {loginErrors.map((error, i) => (
              <div
                className="text-red-700 px-4 py-3 rounded relative mb-2"
                key={i}
              >
                <span className="block sm:inline">{error}</span>
              </div>
            ))}
          </div>
        )}

        <h1 className="text-center">Inicio de sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label htmlFor="email"> Correo:</label>
          <input
            className="input_login"
            type="email"
            name="email"
            placeholder="tuCorreo@dominio.tld"
            {...register("email", { required: true })}
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              className="input_login"
              type="password"
              name="password"
              placeholder="Escribe tu contraseña"
              {...register("password", { required: true, minLength: 6 })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <button className="button_login" type="submit">
            Iniciar
          </button>
        </form>

        <p className="mt-1 text-center">
          ¿No tienes una cuenta? <Link to="/register">Registrar</Link>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
