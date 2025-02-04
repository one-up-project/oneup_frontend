import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom"; // npm install react-router-dom
import { useForm } from "react-hook-form"; // npm install react-hook-form
import { registerSchema } from "../../schemas/auth"; // verifica que los datos sean correctos
import { zodResolver } from "@hookform/resolvers/zod"; // npm install @hookform/resolvers
import './register.css'

function Register() {
  const { signup, errors: registerErrors, isAuthenticated, user, logout} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      switch (user.rol) {
        case "client":
          return navigate("/client");
        case "restaurant":
          return navigate("/restaurant");
        default:
          return logout();
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="container">
      <section>

        {registerErrors.length > 0 && (
          <div className="mb-4">
            {registerErrors.map((error, i) => (
              <div className="text-red-700 px-4 py-3 rounded relative mb-2" key={i}>
                <span className="block sm:inline">{error}</span>
              </div>
            ))}
          </div>
        )}
        
        <h1 className="text-center">Registro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="font-medium">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              placeholder="Escribe tu nombre"
              {...register("username", { required: true })}
              autoFocus
            />
            {errors.username?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="font-medium">Correo:</label>
            <input
              id="email"
              placeholder="tuCorreo@dominio.tld"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="font-medium">Contraseña:</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password")}
              />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-medium">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="font-medium">Numero de teléfono:</label>
            <input
              type="text"
              id="phone"
              placeholder="Escribe tu numero de teléfono"
              {...register("phone")}
            />
            {errors.phone?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="rol" className="font-medium">Rol:</label>
            
            <select id="rol" {...register("rol", { required: true })}>
              <option disabled selected hidden>Selecciona tu rol</option>
              <option value="client">Persona natural</option>
              <option value="restaurant">Restaurante</option>
            </select>
            {errors.rol?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.rol?.message}</p>
            )}
          </div>

          <button type="submit">
            Crear
          </button>
        </form>
        <p className="mt-1 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">
            Inicio de sesión
          </Link>
        </p>
      </section>
    </div>
  );
}

export default Register;
