import React from 'react'

const PutProductos = () => {
  return (
    <>
      <div className="container">
        <p className="fs-1">Modificar Productos</p>
        <hr className="col-3 mb-4" />

        <div className="alert alert-danger" role="alert">
          No posee autorizacion
        </div>
      </div>
    </>
  );
}

export default PutProductos