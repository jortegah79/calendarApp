import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks"
import Swal from "sweetalert2";


const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}
const registerFormFields = {
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
  registerName: ''
}

export const LoginPage = () => {

  const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
  const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
  const { startLogin, startRegister,errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autentificacion', errorMessage, 'error');
    }
  }, [errorMessage]);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword })
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en el registro','las contraseñas no son iguales...','error');
      return;
    }
    startRegister({email:registerEmail, name:registerName, password:registerPassword})
    //console.log({ registerEmail, registerName, registerPassword, registerPassword2 });
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 ">
            <h3 className="mt-5 display-6 text-uppercase text-center text-secondary">Ingreso</h3>
            <h6>( Puedes usar el usuario test@test.es y la contraseña 1111 o registrarte!) </h6>
            <form className="p-2 d-flex flex-column " onSubmit={loginSubmit}>
              <div className="w-100 mx-auto mb-4">
                <input
                  type="text"
                  className="form-control py-4"
                  placeholder="Correo"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="w-100 mx-auto mb-4">
                <input
                  type="password"
                  className="form-control py-4"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="w-100   mb-4">
                <input
                  type="submit"
                  className=" btn fs-4 py-3 w-100 btn-outline-secondary"
                  value="Login"
                />
              </div>
            </form>
          </div>

          <div className="col-12 col-lg-6 ">
          <h3 className="mt-5 display-6 text-uppercase text-center text-secondary">Registro</h3>
            <form className="p-4  flex-column  " onSubmit={registerSubmit}>
            <div className="w-100 mx-auto mb-4">
                <input
                  type="text"
                  className="form-control py-4"
                  placeholder="Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="w-100 mx-auto mb-4">
                <input
                  type="email"
                  className="form-control py-4"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="w-100 mx-auto mb-4">
                <input
                  type="password"
                  className="form-control py-4"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>

               <div className="w-100 mx-auto mb-4">
                <input
                  type="password"
                  className="form-control py-4"
                  placeholder="Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="w-100 mx-auto mb-4 ">
              <input
                  type="submit"
                  className=" btn py-3 fs-3 w-100 btn-outline-secondary"
                  value="Registrar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}