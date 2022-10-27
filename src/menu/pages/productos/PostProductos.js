import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import ModalPersonalizado from '../../../Modals/ModalPersonalizado';
import GetMateriales from '../cuenta/adiciones/GetMateriales';
import PostMaterial from '../cuenta/adiciones/PostMaterial';
import GetCategorias from "../cuenta/adiciones/GetCategorias";
import PostCategoria from "../cuenta/adiciones/PostCategoria";


const PostProductos = () => {

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");
  const [materiales, setMateriales] = useState();
  const [categorias, setCategorias] = useState();
  const [openModalMateriales, setOpenModalMateriales] = useState(false);
  const [openModalCategorias, setOpenModalCategorias] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,    
    //formState: { errors },
  } = useForm();


  useEffect(() => {
    Materiales();
    Categorias();
  },[]);


  const Materiales = () => {
    axios
      .get(urlBase + "materiales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setMateriales(res.data);
      })
      .catch((err) => console.log(err));
  };


  const Categorias = () => {
    axios
      .get(urlBase + "categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setCategorias(res.data);
      })
      .catch((err) => console.log(err));
  };


  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));
    //console.log(token)
    
    axios.post(urlBase + 'productos', JSON.stringify(data), { 
      headers: {
      "Content-Type": "application/json",
      "Content-Security-Policy": "block-all-mixed-content",
      Authorization: `Bearer ${token}`,
      }
    })
    .then(function (data) {
      //console.log(data);
      
      if (data.status === 400) {
        //console.log("Error:", data);
        toast.error("Datos incorrectos", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          theme: "colored",
        });
      } else {

        toast.success("Producto agregado", {
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
        <p className="fs-1">Agregar Producto</p>
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
          <div className="d-flex justify-content-center">
            <Card style={{ width: "30rem" }}>
              <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3 p-3">
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("nombreProducto")}
                          className="form-control"
                        />
                        <label>Producto</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          {...register("materialProducto")}
                          defaultValue={""}                          
                        >
                          <option value="">Seleccione...</option>
                          {materiales &&
                            materiales.map((item, x) => (
                              <option key={x + 1} value={item.nombreMaterial}>
                                {item.nombreMaterial}
                              </option>
                            ))}                          
                        </select>
                        <label>Material</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          {...register("categoriaProducto")}
                          defaultValue={""}                          
                        >
                          <option value="" selected>
                            Seleccione...
                          </option>
                          {categorias &&
                            categorias.map((item, x) => (
                              <option key={x + 1} value={item.nombreCategoria}>
                                {item.nombreCategoria}
                              </option>
                            ))}                          
                        </select>
                        <label>Categoria</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("precioProducto")}
                          className="form-control"
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
                        />
                        <label>Stock</label>
                      </div>
                    </div>
                    <div className="col"></div>
                  </div>

                  <button
                    className="w-100 btn btn-md btn-success mt-3 mb-2"
                    type="submit"
                  >
                    AGREGAR
                  </button>
                </form>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

      {openModalMateriales && (
        <ModalPersonalizado
          componente={<PostMaterial />}
          title={<GetMateriales />}
          close={setOpenModalMateriales}
        />
      )}

      {openModalCategorias && (
        <ModalPersonalizado
          componente={<PostCategoria />}
          title={<GetCategorias />}
          close={setOpenModalCategorias}
        />
      )}

      <ToastContainer />
      <br />
      <br />
      <br />
    </>
  );
}

export default PostProductos