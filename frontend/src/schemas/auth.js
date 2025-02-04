import { z } from "zod"; // npm i zod

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const registerSchema = z // no se están enviando los errores required_error
  .object({
    username: z
      .string({
        required_error: "Nombre de usuario requerido",
      })
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Por favor ingrese un correo válido",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    confirmPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
    phone: z.string().min(9, {
      message: "El teléfono debe tener al menos 9 números",
    }),
    rol: z.string({ required_error: "El rol es requerido"}).min(3, {message: "Debes seleccionar un rol",}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "La contraseña no coincide",
    path: ["confirmPassword"],
  });
