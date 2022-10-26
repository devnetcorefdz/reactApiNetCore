import axios from 'axios';
import React from 'react'
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const PostProductos = () => {

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,    
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    console.log(JSON.stringify(data));
    //console.log(token)
    
    axios.post(urlBase + 'productos', JSON.stringify(data), { 
      headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy": "block-all-mixed-content",
      Authorization: `Bearer ${token}`,
      }
    })
    .then(function (data) {
      console.log(data);
      
      if (data.status === 400) {
        //console.log("Error:", data);
        toast.error("Datos incorrectos", {
          duration: 1000,
          position: "top-center",
        });
      } else {

        toast.success("Producto agregado!", {
          duration: 1000,
          position: "top-center",
        });
                                  
        
        setTimeout(() => {
          navigate("/productos");
          //console.log(data.token)
        }, 1000);                    
        
      }
    }).catch(function (error) {
      console.log(error);      
      toast.error("Datos incorrectos", {
        duration: 2000,
        position: "top-center",
      });
    });

      
      
  }

  return (
    <>
      <div className="container text-center">
        <p className="fs-1">Agregar Productos</p>
        <div className='row justify-content-center'>
        <hr className="col-4 mb-5" />
        </div>
        

        {token === undefined || token === null
          ? 
            <>
              <div className="alert alert-danger" role="alert">
                No posee autorizacion
              </div>
            </>
          
          : 
            <div className='d-flex justify-content-center'>
              <Card style={{ width: '30rem' }}>                
                <Card.Body>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-3 p-3">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        {...register("nombreProducto")}
                        className="form-control"                        
                      />
                      <label>Producto</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        {...register("materialProducto")}
                        className="form-control"
                      />
                      <label>Material</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        {...register("categoriaProducto")}
                        className="form-control"
                      />
                      <label>Categoria</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        {...register("precioProducto")}
                        className="form-control"                        
                      />
                      <label>Precio</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="text"
                        {...register("stockProducto")}
                        className="form-control"
                      />
                      <label>Stock</label>
                    </div>

                    <button
                      className="w-100 btn btn-lg btn-success mt-3 mb-5"
                      type="submit"
                    >
                      INGRESAR
                    </button>
                    
                  </form>
                </Card.Body>
              </Card>
            </div>
          }

      </div>

      <Toaster />

    </>
  );
}

export default PostProductos