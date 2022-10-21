import React from 'react'
import "./Login.css";
import logo from "./images/netcore_react.png";
import { useForm } from 'react-hook-form';


const Login = () => {

  
  const {
    register,
    handleSubmit,    
    //formState: { errors },
  } = useForm();

  const urlBase = "https://jwtlogin.azurewebsites.net/";

  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));

    fetch(urlBase+"api/token", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Content-Security-Policy": "block-all-mixed-content",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        prompt('',data.token,'');
        alert("Bienvenido!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Datos incorrectos");
      });

      /*
      fetch("http://fdznet.somee.com/api/productos")
        .then((response) => response.json())
        .then((datos) => console.log(datos));        
      */
  }
  

 
  return (
    <>
      <div className="text-center mt-5">
        <div className="card form-signin" style={{ width: "18rem" }}>
          <div className="text-center">
            <img src={logo} alt="net-react" className="Logo-Anim" />
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  {...register("email")}
                  className="form-control"
                  defaultValue="fede@mail.com"
                />
                <label>Email</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  {...register("password")}
                  className="form-control"
                />
                <label>Contraseña</label>
              </div>

              <button
                className="w-100 btn btn-lg btn-success mt-3"
                type="submit"
              >
                INGRESAR
              </button>
              <div className="text-center">
                <p className="mt-5 mb-3 text-muted">
                  {new Date().getFullYear()}{" "}
                  <i className="fa-regular fa-copyright"></i>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login