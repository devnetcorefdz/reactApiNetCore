import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";


const PutProductos = () => {
  
  const [data, setData] = useState();
  const [nombre, setnombre] = useState();
  const [material, setMaterial] = useState();
  const [categoria, setCategoria] = useState();
  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");


  const handleNombre = (e) => {
    console.log(e.target.value);
  }

  const handleMaterial = () => {
    
  }

  const handleCategoria = () => {
    
  }

  const handlePrecio = () => {
    
  }

  const handleStock = () => {
    
  }


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
        <p className="fs-1">Modificar Productos</p>
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

              {!data &&                
                <>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </>
              }

              {data && (
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Producto</th>
                      <th>Material</th>
                      <th>Categoria</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>                                                                
                    {data.map((item,x) =>                    
                      <tr key={x+1}>
                        <td>{x+1}</td>
                        <td> <input type="text" className="form-control text-center" onChange={handleNombre} value={item.nombreProducto} /> </td>
                        <td> <input type="text" className="form-control text-center" onChange={handleMaterial} value={item.materialProducto} /> </td>
                        <td> <input type="text" className="form-control text-center" onChange={handleCategoria} value={item.categoriaProducto} /> </td>
                        <td> <input type="text" className="form-control text-center" onChange={handlePrecio} value={item.precioProducto} /> </td>
                        <td> <input type="text" className="form-control text-center" onChange={handleStock} value={item.stockProducto} /> </td>
                        <td> <Button variant="warning">Cambiar</Button> </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </>
        }
        

        
      </div>
    </>
  );
};

export default PutProductos