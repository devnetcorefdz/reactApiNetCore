
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Login from "./Login";
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import GetProductos from "./pages/productos/GetProductos";
import PostProductos from "./pages/productos/PostProductos";
import PutProductos from "./pages/productos/PutProductos";
import DeleteProductos from "./pages/productos/DeleteProductos";
import Token from "./pages/Token";



function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inicio" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="token" element={<Token />} />
        <Route path="productos" element={<GetProductos />} />
        <Route path="agregarProductos" element={<PostProductos/>} />
        <Route path="modificarProductos" element={<PutProductos/>} />
        <Route path="eliminarProductos" element={<DeleteProductos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
