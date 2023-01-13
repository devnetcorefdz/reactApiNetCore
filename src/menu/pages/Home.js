import React, { useEffect, useState } from 'react'



const Home = () => {

  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <>
      <div className="container">
        <p className="fs-1">Inicio</p>
        <hr className="col-3 mb-4" />

        {token === undefined || token === null ? (
          <>
            <p className="fs-3">No tiene permisos</p>            
          </>
        ) : (
          <>
            <p className="fs-3">Bienvenido</p>
          </>
        )}
      </div>
    </>
  );
}

export default Home