import axios from "axios";
import React, { useEffect } from "react";



const GetProductos = () => {

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");

  useEffect(() => {

    //console.log(token)

    axios
      .get(urlBase + "productos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      

  })
  

  return (
    <>
      <div className="container">
        <p className="fs-1">Productos</p>
        <hr className="col-3 mb-4" />

        <div className="alert alert-danger" role="alert">
          No posee autorizacion
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Material</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetProductos;
