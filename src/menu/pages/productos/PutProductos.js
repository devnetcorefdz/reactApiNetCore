import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from "react-toastify";


const PutProductos = () => {
  
  const [data, setData] = useState();
  const [nombre, setNombre] = useState('');
  const [material, setMaterial] = useState();
  const [categoria, setCategoria] = useState();
  const [precio, setPrecio] = useState();
  const [stock, setStock] = useState();

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {

    //console.log(token)

    axios
      .get(urlBase + "productos/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data)
        setNombre(res.data.nombreProducto)
        setMaterial(res.data.materialProducto)
        setCategoria(res.data.categoriaProducto)
        setPrecio(res.data.precioProducto)
        setStock(res.data.stockProducto)

        setData(res.data);
      })
      .catch((err) => console.log(err));
      

  },[])


  const {
    register,
    handleSubmit,    
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));
    //console.log(token)
    
    axios.put(urlBase + 'productos/' + id, JSON.stringify(data),{            
      headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy": "block-all-mixed-content",
      Authorization: `Bearer ${token}`,      
      }
    })
    .then(function (data) {
      //console.log(data);
      
      if (data.status === 400) {
        console.log("Error:", data);
        toast.error("Datos incorrectos", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          theme: "colored",
        });
      } else {

        toast.warn("Producto modificado", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          theme: "colored",
        });
                                          
        setTimeout(() => {
          navigate("/productos");
          //console.log(data.token)
        }, 2000);                    
        
      }
    }).catch(function (error) {
      console.log(error);      
      toast.error("Datos incorrectos", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        theme: "colored",
      });
    });
  }
  

  return (
    <>
      <div className="container text-center">
        <p className="fs-1">Modificar Producto</p>
        <div className="row justify-content-center">
          <hr className="col-4 mb-3" />
        </div>

        {token === undefined || token === null ? (
          <>
            <div className="alert alert-danger" role="alert">
              No posee autorizacion
            </div>
          </>
        ) : (
          <>
            {!data && (
              <>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </>
            )}

            {data && (
              <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                  <input type="hidden" {...register("productoId")} value={id} />

                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("nombreProducto")}
                          className="form-control"
                          value={nombre}
                          onChange={(e) => {
                            setNombre(e.target.value);
                          }}
                        />
                        <label>Producto</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("materialProducto")}
                          className="form-control"
                          value={material}
                          onChange={(e) => {
                            setMaterial(e.target.value);
                          }}
                        />
                        <label>Material</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("categoriaProducto")}
                          className="form-control"
                          value={categoria}
                          onChange={(e) => {
                            setCategoria(e.target.value);
                          }}
                        />
                        <label>Categoria</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("precioProducto")}
                          className="form-control"
                          value={precio}
                          onChange={(e) => {
                            setPrecio(e.target.value);
                          }}
                        />
                        <label>Precio</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-floating">
                        <input
                          type="text"
                          {...register("stockProducto")}
                          className="form-control"
                          value={stock}
                          onChange={(e) => {
                            setStock(e.target.value);
                          }}
                        />
                        <label>Stock</label>
                      </div>
                    </div>
                    <div className="col"></div>
                  </div>

                  <button
                    className="w-100 btn btn-md btn-warning mt-3 mb-5"
                    type="submit"
                  >
                    MODIFICAR
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </>
  );
};

export default PutProductos