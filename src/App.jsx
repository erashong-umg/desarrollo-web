import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Categorias from './pages/Categorias'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Registro from './pages/Registro'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import AdminProductos from './pages/AdminProductos'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'
import RequireAuth from './components/RequireAuth'
import RequireAdmin from './components/RequireAdmin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="producto/:id" element={<ProductoDetalle />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="registro" element={<Registro />} />
        <Route path="login" element={<Login />} />
        <Route
          path="perfil"
          element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }
        />
        <Route
          path="admin/productos"
          element={
            <RequireAdmin>
              <AdminProductos />
            </RequireAdmin>
          }
        />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
