import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/netcore_react.png'
import toast, { Toaster } from "react-hot-toast";
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import "../Menu.css";

const Menu = () => {

  
  const [token, setToken] = useState();
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [token]);

  //console.log("token: " + token);


  const btnLogOut = () => {

    setToken(null);
    localStorage.removeItem("token");

    toast.error("Sesion cerrada", {
      duration: 2000,
      position: "top-center",
    });

  }

  //const navigate = useNavigate();

  const {
    register,
    handleSubmit,    
    //formState: { errors },
  } = useForm();

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  

  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));
    
    
    fetch(urlBase+"token", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Content-Security-Policy": "block-all-mixed-content",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.status === 400) {
          //console.log("Error:", data);
          toast.error("Datos incorrectos", {
            duration: 1000,
            position: "top-center",
          });
        } else {

          toast.success("Bienvenido!", {
            duration: 1000,
            position: "top-center",
          });
          
          localStorage.setItem("token", data.token);          
          
          setToken(localStorage.getItem('token'))

          handleClose();

          /*
          setTimeout(() => {
            navigate("/");
            //console.log(data.token)
          }, 1000);                    
          */
                    
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Datos incorrectos", {
          duration: 2000,
          position: "top-center",
        });
      });
      
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


              <li className="nav-item dropdown me-2 mb-3">
                <Link
                  className="nav-link dropdown-toggle active"
                  to={"token"}
                  id="navbarDropdown"
                  href="/#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Productos
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to={"productos"}>
                      Lista
                    </Link>
                  </li>
                  {token === undefined || token === null
                    ? 
                    <>                      
                    </>
                    : 
                    <>
                      <li>
                        <Link className="dropdown-item" to={"agregarProductos"}>
                          Agregar
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"modificarProductos"}>
                          Modificar
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"eliminarProductos"}>
                          Eliminar
                        </Link>
                      </li>
                    </>
                  }
                  
                </ul>
              </li>
              

              {token === undefined || token === null
                ? 
                <>
                  <li className="nav-item ms-3">
                    <Button className="btn btn-success btn-sm" onClick={handleShow}>
                      INICIAR SESION
                    </Button>
                  </li>
                </>
                : 
                <>
                  <li className="nav-item ms-3">
                    <button onClick={btnLogOut} className="btn btn-danger btn-sm">
                      CERRRAR SESION
                    </button>
                  </li>
                </>
              }
                            
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

              <button
                className="w-100 btn btn-lg btn-success mt-3 mb-5"
                type="submit"
              >
                INGRESAR
              </button>
              
            </form>
        </Modal.Body>        
      </Modal>

      <Toaster />
    </>
  );
}

export default Menu