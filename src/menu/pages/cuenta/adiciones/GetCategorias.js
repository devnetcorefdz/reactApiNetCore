
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


const GetCategorias = () => {

    const urlBase = "https://jwtlogin.azurewebsites.net/api/";
    const token = localStorage.getItem("token");
    const [categorias, setCategorias] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setShow(true);
      setIdDelete(id);
    };
    const { handleSubmit } = useForm();
    const [idDelete, setIdDelete] = useState("");

    useEffect(() => {
      Categorias();
    },[]);


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


    const DelCategoria = () => {
      //console.log(JSON.stringify(data));
      //console.log(token)

      axios
        .delete(urlBase + "categorias/" + idDelete, {
          headers: {
            "Content-Type": "application/json",
            "Content-Security-Policy": "block-all-mixed-content",
            Authorization: `Bearer ${token}`,
          },
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

            Categorias();
            handleClose(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Datos incorrectos", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            theme: "colored",
          });
        });
    };


  return (
    <>
      <div className="container">
        <p className="fs-1">
          <span className="me-4">Categorias</span>
          {token && (
            <Link to={"/micuenta/agregarCategoria"}>
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
            {!categorias && (
              <>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </>
            )}

            {categorias && (
              <table className="table table-bordered text-center mb-5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    {token && (
                      <>
                        <th>---</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((item, x) => (
                    <tr key={x + 1}>
                      <td>{x + 1}</td>
                      <td>{item.nombreCategoria}</td>
                      {token && (
                        <>
                          <td>
                            <div className="btn-group">
                              {/** 
                            <Link to={"/modificarProducto/" + item.productoId}>
                              <button
                                type="submit"
                                className="btn btn-warning me-3"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </Link>
                            */}

                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleShow(item.categoriaId)}
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

        <Modal show={show} onHide={handleClose} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Eliminar categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(DelCategoria)} className="p-3">
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
      </div>
    </>
  );
}

export default GetCategorias