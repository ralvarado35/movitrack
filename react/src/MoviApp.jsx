import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import Countries from "./pages/Countries";
import Borders from "./pages/Borders";
import Clients from "./pages/Clients";
import Drivers from "./pages/Drivers";
import MovementsTable from "./pages/MovementsTable";
import { Navigate, Route, Routes } from "react-router";
import { DefaultLayout } from "./components/DefaultLayout";
import { GuestLayout } from "./components/GuestLayout";
import { Users } from "./pages/Users";
import { useStateContext } from "./context/ContextProvider"; // Asegúrate de importar el contexto

export const MoviApp = () => {
  const { token } = useStateContext();  // Obtenemos el token del contexto

  return (
    <Routes>
      {/* Redirigir la raíz ("/") en función de si el usuario está autenticado */}
      <Route path="/" element={token ? <Navigate to="/movements" /> : <Navigate to="/login" />} />

      {/* Rutas bajo el layout de usuarios no autenticados */}
      <Route element={<GuestLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Rutas bajo el layout para usuarios autenticados */}
      <Route element={<DefaultLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="countries" element={<Countries />} />
        <Route path="borders" element={<Borders />} />
        <Route path="clients" element={<Clients />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="movements" element={<MovementsTable />} />
      </Route>

      {/* Ruta para manejar rutas inexistentes (404) */}
      <Route path="*" element={<Navigate to={token ? "/movements" : "/login"} />} />
    </Routes>
  );
};
