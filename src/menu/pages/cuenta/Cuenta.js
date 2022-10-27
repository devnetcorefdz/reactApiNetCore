import React from 'react'
import { Link } from 'react-router-dom';

const Cuenta = () => {

  const token = localStorage.getItem("token");

  return (
    <>
      <div className="container">
        <p className="fs-1">Mi cuenta</p>
        <hr className="col-3 mb-4" />

        {token === undefined || token === null ? (
          <>
            <div className="alert alert-danger" role="alert">
              No posee autorizacion
            </div>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link to={"/micuenta/materiales"}>Materiales</Link>
              </li>
              <li>
                <Link to={"/micuenta/categorias"}>Categorias</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Cuenta