import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";// npm install react-router-dom
import { useForm } from "react-hook-form"; // npm install react-hook-form
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"; // npm install @hookform/resolvers
import { loginSchema } from "../../schemas/auth"; // mensajes de errores
import './login.css'

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    const redirectUser = async () => {
    if (isAuthenticated) {
      switch (user.rol) {
        case "client":
          return navigate("/");
        case "restaurant":
          return navigate("/restaurant");
        default:
          return logout();
      }
    }
  };
  redirectUser();
  }, [isAuthenticated, logout, user, navigate]);

  return (
    <div className="container_login">
      <section className="section_login">

        {loginErrors.map((error, i) => (
          <div className="text-red-700 px-4 py-3 rounded relative mb-2" key={i}>
          <span className="block sm:inline">{error}</span>
        </div>
        ))}

        <h1 className="text-center">Inicio de sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email"> Correo:</label>
          <input className="input_login"
            type="email"
            name="email"
            placeholder="tuCorreo@dominio.tld"
            {...register("email", { required: true })}
          />
          <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input className="input_login"
            type="password"
            name="password"
            placeholder="Escribe tu contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
        </div>

          <button className="button_login" type="submit">Iniciar</button>
        </form>

        <p className="mt-1 text-center">
          ¿No tienes una cuenta? <Link to="/register">Registrar</Link>
        </p>
      </section>
    </div>
  );
}
