import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { Afiliados } from './pages/Afiliados'
import { CargarVisita } from './pages/CargarVisita'
import { Cursos } from './pages/Cursos'
import { EmpresaDetalle } from './pages/EmpresaDetalle'
import { Empresas } from './pages/Empresas'
import { Login } from './pages/Login'
import { Tablero } from './pages/Tablero'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  {
    element: <AppShell />,
    children: [
      { path: '/tablero', element: <Tablero /> },
      { path: '/empresas', element: <Empresas /> },
      { path: '/empresas/:id', element: <EmpresaDetalle /> },
      { path: '/cargar-visita', element: <CargarVisita /> },
      { path: '/afiliados', element: <Afiliados /> },
      { path: '/cursos', element: <Cursos /> },
    ],
  },
])
