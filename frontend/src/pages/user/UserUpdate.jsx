import { useEffect, useState, React } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom"; // npm install react-router-dom
import { useForm } from "react-hook-form"; // npm install react-hook-form
import { registerSchema } from "../../schemas/auth"; // verifica que los datos sean correctos
import { zodResolver } from "@hookform/resolvers/zod"; // npm install @hookform/resolvers
import "./userUpdate.css";

function UserUpdate() {
  const {
    update,
    errors: registerErrors,
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema), // verifica que los datos sean correctos
  });

  const navigate = useNavigate();

  // Función para obtener geolocalización
  const [geoError, setGeoError] = useState("");
  const [geoSuccess, setGeoSuccess] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocalización no soportada por tu navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        setGeoSuccess("Ubicación obtenida correctamente");
        setGeoError("");
      },
      (error) => {
        setGeoError("Debes permitir el acceso a tu ubicación para continuar");
        setValue("latitude", null);
        setValue("longitude", null);
      }
    );
  };

  useEffect(() => {
    if (user?.lat && user?.long) {
      setValue("latitude", parseFloat(user.lat));
      setValue("longitude", parseFloat(user.long));
    }
  }, [user, setValue]);

  const onSubmit = async (value) => {
    value.id = parseInt(user.id, 10); // Asigna el id del usuario como un entero a value
    // si existe el usuario, asigna la latitud y longitud del usuario a value
    await update(value); // envía los datos del formulario a la función update de authContext

    if (isAuthenticated) {
      switch (user.rol) {
        case "client":
          return navigate("/user/home"); // redirige a home
        case "restaurant":
          return navigate("/store/home");
        default:
          return logout();
        //return console.log("No tiene un rol asignado");
      }
    }
  };
  /*
  useEffect(() => {
    const redirectUser = async () => {
      if (isAuthenticated) {
        switch (user.rol) {
          case "client":
            return navigate("/user/home"); // redirige a home
          case "restaurant":
            return navigate("/store/home");
          default:
            return logout();
          //return console.log("No tiene un rol asignado");
        }
      }
    };
    redirectUser();
  }, [isAuthenticated, user, navigate, logout]);
*/
  // Obtener geolocalización

  return (
    <div className="container_register">
      <section className="section_register">
        {registerErrors.length > 0 && (
          <div className="mb-4">
            {registerErrors.map((error, i) => (
              <div
                className="text-red-700 px-4 py-3 rounded relative mb-2"
                key={i}
              >
                <span className="block sm:inline">{error}</span>
              </div>
            ))}
          </div>
        )}

        <h1 className="text-center">Actualización de datos</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="font-medium">
              Nombre de Usuario:
            </label>
            <input
              className="input_register"
              type="text"
              id="username"
              placeholder="Escribe tu nombre"
              defaultValue={user?.username}
              {...register("username", { required: true })}
              autoFocus
            />
            {errors.username?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="font-medium">
              Correo:
            </label>
            <input
              className="input_register"
              id="email"
              placeholder="tuCorreo@dominio.tld"
              defaultValue={user?.email}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="font-medium">
              Contraseña:
            </label>
            <input
              className="input_register"
              type="password"
              id="password"
              placeholder="********"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-medium">
              Confirmar Contraseña:
            </label>
            <input
              className="input_register"
              type="password"
              id="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="font-medium">
              Numero de teléfono:
            </label>
            <input
              className="input_register"
              type="text"
              id="phone"
              placeholder="Escribe tu numero de teléfono"
              defaultValue={user?.phone}
              {...register("phone")}
            />
            {errors.phone?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="rol" className="font-medium">
              Rol:
            </label>

            <select
              className="select_register"
              id="rol"
              defaultValue={user?.rol || "default"}
              {...register("rol", { required: true })}
            >
              <option value="default" disabled hidden>
                Selecciona tu rol
              </option>
              <option value="client">Persona natural</option>
              <option value="restaurant">Restaurante</option>
            </select>
            {errors.rol?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.rol?.message}</p>
            )}
          </div>

          {/* Botón de geolocalización */}
          <div className="form-group">
            <button
              type="button"
              onClick={getLocation}
              className="button_register"
            >
              Obtener mi ubicación automática
            </button>
            {geoError && <span className="error-message">{geoError}</span>}
            {geoSuccess && (
              <span className="success-message">{geoSuccess}</span>
            )}
          </div>

          <button type="submit" className="button_register">
            Actualizar
          </button>
        </form>
        <p className="mt-1 text-center">
          ¿Ya tienes una cuenta? <Link to="/login">Inicio de sesión</Link>
        </p>
      </section>
    </div>
  );
}

export default UserUpdate;
