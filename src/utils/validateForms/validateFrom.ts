import * as yup from "yup";
export const LoginValidate = yup.object().shape(
  {
    username: yup.string().trim().required('Credencial requerida'),
    password: yup.string().trim().required('Credencial requerido'),
  }
);