/**
 * @fileoverview Configuración de rutas principales de la aplicación médica
 * @module Routes
 * @author [Tu nombre o el del equipo]
 * @version 1.0.0
 */

/**
 * @typedef {Object} RouteConfig
 * @property {string} path - Ruta URL
 * @property {JSX.Element} element - Componente React a renderizar
 * @property {JSX.Element} [errorElement] - Componente para manejar errores
 * @property {RouteConfig[]} [children] - Sub-rutas anidadas
 */

/**
 * @constant
 * @type {import('react-router-dom').RouteObject[]}
 * @description Router principal que contiene todas las rutas de la aplicación
 *
 * @example
 * import router from './routes';
 *
 * // En tu archivo principal
 * <RouterProvider router={router} />
 *
 * @returns {RouteObject[]} Configuración de rutas de la aplicación
 */
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login2";
import { Layaud } from "../pages/layaud";
import ProtectedRoute from "./protectedRoute";
import RouteRedirect from "./routeRedirect";

import DashboardMedic from "../pages/medico/dashboardMedic";
import ConsultasMedic from "../pages/medico/consultasMedic";
import Historial  from "../pages/historial/historial";
import { Tpacientes } from "../pages/tpacientes/tpacientes";
import Recetas from "../pages/medico/Recetas";
import Configuracion from "../pages/Configuracion/Configuracion";
import Reportes from "../pages/reportes/reportes";
import { Histiorialcom } from "../pages/historial/histiorialcom";
import DashboardPaciente from "../pages/paciente/dashboardPaciente";
import { HistiorialPaciente } from "../pages/historialpaciente/historial";
import { TablaDoctores } from "../pages/tdoctores/tabla";
import CitasPanel from "../pages/paciente/citas/CitasPanel";
import LandingPage from "../pages/landing/landingPage"; // Agregar la importación del componente PaginaInicio


const ROLES = {
  ADMIN: "admin",
  MEDIC: "doctor",
  PATIENT: "patient",
};

const router = createBrowserRouter([
  // Ruta principal
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>¡Ups! Algo salió mal - Página no encontrada</div>,
  },

  // Área de Pacientes
  {
    path: "/app-paciente",
    element: (
      <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
        <Layaud />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RouteRedirect to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <DashboardPaciente />,
      },
      {
        path: "agendar-cita",
        element: <div>Agendar Nueva Cita</div>,
      },
      {
        path: "mis-citas",
        element: <CitasPanel/>,
      },
      {
        path: "consulta/:citaId",
        element: <div>Sala de Consulta Virtual</div>,
      },
      {
        path: "historial",
        element: <HistiorialPaciente/>,
      },
      {
        path: "doctores",
        element: <TablaDoctores/>,
      },
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "reportes",
        element: <Reportes/>,
      },
    ],
  },

  // Área de Médicos
  {
    path: "/app-medico",
    element: (
      <ProtectedRoute allowedRoles={[ROLES.MEDIC]}>
        <Layaud />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RouteRedirect to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <DashboardMedic />,
      },
      {
        path: "mis-citas",
        element: <ConsultasMedic/>,
      },
      {
        path: "pacientes",
        element: <Tpacientes/>,
      },
      {
        path: "historial",
        element: <Historial />,
      },
      {
        path:"historial/paciente",
        element:<Histiorialcom/>
      },
      {
        path: "recetas",
        element: <Recetas />,
      },
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "reportes",
        element: <Reportes/>,
      },
    ],
  },

  // Área de Administradores
  {
    path: "/app-administrador",
    element: (
      <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
        <Layaud />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RouteRedirect to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <div>Panel de Control - Administrador</div>,
      },
      {
        path: "gestionar-citas",
        element: <div>Gestión de Citas</div>,
      },
      {
        path: "gestionar-medicos",
        element: <div>Gestión de Médicos</div>,
      },
      {
        path: "gestionar-pacientes",
        element: <div>Gestión de Pacientes</div>,
      },
      
      {
        path: "configuracion",
        element: <Configuracion />,
      },
      {
        path: "reportes",
        element: <Reportes/>,
      },
    ],
  },

  // Rutas de autenticación
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <div>Página de Registro</div>,
  },
  {
    path: "/unauthorized",
    element: <div>No autorizado</div>
  }
]);

export default router;
