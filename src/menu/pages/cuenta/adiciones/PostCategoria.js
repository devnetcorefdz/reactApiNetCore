import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const PostCategoria = () => {

  const urlBase = "https://jwtlogin.azurewebsites.net/api/";
  const token = localStorage.getItem("token");
  const [categorias, setCategorias] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  useEffect(() => {
    Categorias();
  }, []);

  const Categorias = () => {
    axios
      .get(urlBase + "categorias", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log(res.data); 
        setCategorias(res.data)       
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    //console.log(JSON.stringify(data));
    //console.log(token)

    axios
      .post(urlBase + "categorias", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Content-Security-Policy": "block-all-mixed-content",
          Authorization: `Bearer ${token}`,
        },
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
          toast.success("Categoria agregada", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/micuenta/categorias");
            //console.log(data.token)
          }, 2000);
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
      <div className="container text-center">
        <p className="fs-1">Nueva Categoria</p>
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          {...register("nombreCategoria")}
                          className="form-control"
                        />
                        <label>Nueva categoria</label>
                      </div>
                    </div>
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

      <ToastContainer />
    </>
  );
};

export default PostCategoria;
