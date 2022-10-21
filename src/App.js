
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Login from "./login/Login";
import NotFound from "./NotFound";
import Home from "./menu/pages/Home";
import Menu from "./menu/Menu";
import GetProductos from "./menu/pages/productos/GetProductos";
import PostProductos from "./menu/pages/productos/PostProductos";
import PutProductos from "./menu/pages/productos/PutProductos";
import DeleteProductos from "./menu/pages/productos/DeleteProductos";
import Token from "./menu/pages/Token";



function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="login" element={<Login />} />
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
            path="agregarProductos"
            element={
              <>
                <PostProductos />
              </>
            }
          />
          <Route
            path="modificarProductos"
            element={
              <>
                <PutProductos />
              </>
            }
          />
          <Route
            path="eliminarProductos"
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
