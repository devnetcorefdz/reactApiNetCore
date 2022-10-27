import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const GetProductos = () => {

  const [data, setData] = useState();
  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
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
      

  },[])

  const {    
    handleSubmit    
  } = useForm();



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
          duration: 1000,
          position: "top-center",
        });
      } else {

        toast.error("Producto eliminado", {
          duration: 1000,
          position: "top-center",
          icon: '👏',
        });
                                  
        handleClose(true) ;

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
      <div className="container">
        <p className="fs-1">
          <span className="me-3">Productos</span>
          <Link to={"/agregarProducto"}>
            <button className="btn btn-success">
              <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
        </p>
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
                <table className="table table-bordered text-center mb-5">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Producto</th>
                      <th>Material</th>
                      <th>Categoria</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      {token &&
                        <>
                          <th>---</th>
                        </>                        
                      }
                    </tr>
                  </thead>
                  <tbody>                                                    
                    {data.map((item,x) =>                                                
                      <tr key={x+1}>
                        <td>
                          {x+1}                          
                        </td>
                        <td>
                          {item.nombreProducto}                          
                        </td>
                        <td>
                          {item.materialProducto}                           
                        </td>
                        <td>
                          {item.categoriaProducto}                          
                        </td>
                        <td>
                          $ {item.precioProducto}                          
                        </td>
                        <td>
                          {item.stockProducto}                          
                        </td>
                        {token &&
                          <>
                            <td>
                              <div className="btn-group">
                                <Link to={"/modificarProducto/"+item.productoId}>
                                  <button type="submit" className="btn btn-warning me-3">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                </Link>
                                                            
                                <button type="button" className="btn btn-danger" onClick={() => handleShow(item.productoId)}>
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>                        
                            </td>
                          </>                        
                        }                        
                      </tr>                          
                    )}         
                  </tbody>                             
                </table>                
              )}
            </>
        }
        
      </div>
      <br/><br/><br/>

      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3 p-3">

              <button
                className="w-100 btn btn-md btn-danger mt-3 mb-5"
                type="submit"
              >
                Si, eliminar
              </button>
              
            </form>
        </Modal.Body>        
      </Modal>

      <Toaster/>

    </>
  );
};

export default GetProductos;
