import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/netcore_react.png'

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
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

              <li className="nav-item">
                <Link className="nav-link active" to={"productos"}>
                  Productos
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to={"token"}>
                  Token
                </Link>
              </li>

              <li className="nav-item dropdown">
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
                </ul>
              </li>

              <li className="nav-item ms-3">
                <Link className="btn btn-success btn-sm" to={"login"}>
                  INICIAR SESION
                </Link>
              </li>
              <li className="nav-item ms-3">
                <button className="btn btn-danger btn-sm">
                  CERRRAR SESION
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu