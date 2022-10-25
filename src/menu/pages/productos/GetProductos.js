import axios from "axios";
import React, { useEffect, useState } from "react";



const GetProductos = () => {

  const [data, setData] = useState();
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
      .then((res) => {
        //console.log(res.data)
        setData(res.data);
      })
      .catch((err) => console.log(err));
      

  })
  

  return (
    <>
      <div className="container">
        <p className="fs-1">Productos</p>
        <hr className="col-3 mb-4" />

        {token === undefined || token === null
          ? 
            <>
              <div className="alert alert-danger" role="alert">
                No posee autorizacion
              </div>
            </>
          
          : 
            <>
              <table className="table table-bordered text-center">
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
                {data &&
                  data.map((item,x) =>                    
                    <tr key={x+1}>
                      <td>{x+1}</td>
                      <td>{item.nombreProducto}</td>
                      <td>{item.materialProducto}</td>
                      <td>{item.precioProducto}</td>
                      <td>{item.stockProducto}</td>
                    </tr>
                  )
                }
                  
                </tbody>
              </table>
            </>
        }
        

        
      </div>
    </>
  );
};

export default GetProductos;
