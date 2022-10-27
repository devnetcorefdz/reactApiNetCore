
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import NotFound from "./NotFound";
import Home from "./menu/pages/Home";
import Menu from "./menu/Menu";
import GetProductos from "./menu/pages/productos/GetProductos";
import PostProductos from "./menu/pages/productos/PostProductos";
import PutProductos from "./menu/pages/productos/PutProductos";
import DeleteProductos from "./menu/pages/productos/DeleteProductos";
import Token from "./menu/pages/Token";



function App() {

  setTimeout(() => {
    localStorage.removeItem("token");    
    console.log("Sesion expirada");
    window.location.href = "/"
  }, 3600000);
  //3.600.000 = 1 hora

  //localStorage.getItem("token") === null && ();

  

  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route
            path="inicio"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            path="token"
            element={
              <>
                <Token />
              </>
            }
          />
          <Route
            path="productos"
            element={
              <>
                <GetProductos />
              </>
            }
          />
          <Route
            path="agregarProducto"
            element={
              <>
                <PostProductos />
              </>
            }
          />
          <Route
            path="modificarProducto/:id"
            element={
              <>
                <PutProductos />
              </>
            }
          />
          <Route
            path="eliminarProducto"
            element={
              <>
                <DeleteProductos />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
