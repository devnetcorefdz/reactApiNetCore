import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/netcore_react.png'
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import "../Menu.css";
import axios from 'axios';

const Menu = () => {

  
  const [token, setToken] = useState();
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const nombre = localStorage.getItem("nombre");

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [token]);

  //console.log("token: " + token);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  //console.log(process.env.REACT_APP_API_URL_TOKEN);

  const urlBase = process.env.REACT_APP_API_URL_TOKEN;

  const btnLogOut = () => {

    setToken(null);
    localStorage.removeItem("token");

    toast.error("Sesion cerrada", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1000,
      theme: "colored",
    });

    navigate("/");

  }

  

  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));    
    
    axios
      .post(urlBase, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",          
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status === 400) {
          //console.log("Error:", data);
          toast.error("Datos incorrectos", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          toast.success("¡ Bienvenido " + data.nombre + " !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            theme: "colored",
          });

          localStorage.setItem("token", data.token);
          localStorage.setItem("nombre", data.nombre);

          setToken(localStorage.getItem("token"));
          handleClose();
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error!! ", error);
        toast.error("Datos incorrectos", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          theme: "colored",
        });
      });

    /*
    fetch(urlBase+"token", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        //"Content-Security-Policy": "block-all-mixed-content",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.status === 400) {
          //console.log("Error:", data);
          toast.error("Datos incorrectos", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            theme: "colored",
          });
        } else {

          toast.success("¡ Bienvenido " + data.nombre + " !", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            theme: "colored",
          });
          
          localStorage.setItem("token", data.token);
          localStorage.setItem("nombre", data.nombre);

          setToken(localStorage.getItem('token'))
          handleClose();
          navigate("/");          
                    
        }
        
      })
      .catch((error) => {
        console.error("Error!! ", error);
        toast.error("Datos incorrectos", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          theme: "colored",
        });
      });
      */
      
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5 p-4">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            REACT
            <img src={logo} alt="net-react" className="Logo-Menu" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Inicio
                </Link>
              </li>

              {token && (
                <li className="nav-item">
                  <Link className="nav-link active" to={"productos"}>
                    Productos
                  </Link>
                </li>
              )}

              {token === undefined || token === null ? (
                <>
                  <li className="nav-item ms-3">
                    <Button
                      className="btn btn-success btn-sm"
                      onClick={handleShow}
                    >
                      INICIAR SESION
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {nombre}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to={"micuenta"}>
                          Mi cuenta
                        </Link>                        
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item ms-3">
                        <button
                          onClick={btnLogOut}
                          className="btn btn-danger btn-sm"
                        >
                          CERRRAR SESION
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 p-3">
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

            <input type="hidden" {...register("displayName")} />

            <button
              className="w-100 btn btn-md btn-success mt-3 mb-5"
              type="submit"
            >
              INGRESAR
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default Menu