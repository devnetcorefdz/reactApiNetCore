import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



const GetProductos = () => {

  const [data, setData] = useState();  
  const urlBase = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();
  

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIdDelete(id);
  }
    

  useEffect(() => {

    //console.log(token)
    obtenerProductos();      

  },[])

  const {    
    handleSubmit    
  } = useForm();


  const obtenerProductos = () => {
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
  }
  

  const onSubmit = (data) => {
    
    //console.log(JSON.stringify(data));
    //console.log(token)
    
    axios.delete(urlBase + 'productos/' + idDelete,{            
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

        toast.error("Producto eliminado", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
          theme: "colored",
        });
        
        //navigate("/productos");
        obtenerProductos();
        handleClose(true) ;
        
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
      <div className="container">
        <p className="fs-1">
          <span className="me-4">Productos</span>
          {token && (
            <Link to={"/agregarProducto"}>
              <button className="btn btn-success">
                <i className="fa-solid fa-plus"></i>
              </button>
            </Link>
          )}
        </p>
        <hr className="col-3 mb-4" />

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
              <table className="table table-bordered text-center mb-5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>
                      <span className="me-3">Material</span>
                      {token && (
                        <Link to={"/micuenta/materiales"}>
                          <i className="fa-solid fa-plus text-primary"></i>
                        </Link>
                      )}
                    </th>
                    <th>
                      <span className="me-3">Categoria</span>
                      {token && (
                        <Link to={"/micuenta/categorias"}>
                          <i className="fa-solid fa-plus text-primary"></i>
                        </Link>
                      )}
                    </th>
                    <th>Precio</th>
                    <th>Stock</th>
                    {token && (
                      <>
                        <th>---</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, x) => (
                    <tr key={x + 1}>
                      <td>{x + 1}</td>
                      <td>{item.nombreProducto}</td>
                      <td>{item.materialProducto}</td>
                      <td>{item.categoriaProducto}</td>
                      <td>$ {item.precioProducto}</td>
                      <td>{item.stockProducto}</td>
                      {token && (
                        <>
                          <td>
                            <div className="btn-group">
                              <Link
                                to={"/modificarProducto/" + item.productoId}
                              >
                                <button
                                  type="submit"
                                  className="btn btn-warning me-3"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </Link>

                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleShow(item.productoId)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      <br />
      <br />
      <br />

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="p-3">
            <button
              className="w-100 btn btn-md btn-danger"
              type="submit"
            >
              Si, eliminar
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default GetProductos;
