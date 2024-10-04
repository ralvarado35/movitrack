import {Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'

export const DefaultLayout = () => {

   const {user, token, setUser, setToken} = useStateContext()



   if (!token) {
    return <Navigate to="/login" />
   }

   const onLogout = async (e) => {
    e.preventDefault()
    try {
        await axiosClient.post('/logout');
        // Elimina el token del localStorage o del contexto de tu aplicación
        localStorage.removeItem('ACCESS_TOKEN');
        console.log("Has cerrado sesión correctamente");
        return <Navigate to="/login" />
      } catch (error) {
        console.error("Error al cerrar sesión", error);
      }
   }


  return (
    <div id="defaultLayout">
        <aside>
            <Link to="/movements">Movimientos</Link>
            {/* <Link to="/inicio">Inicio</Link> */}
            <Link to="/countries">Paises</Link>
            <Link to="/borders">Fronteras</Link>
            <Link to="/clients">Clientes</Link>
            <Link to="/drivers">Motorista</Link>
        </aside>
         <div className="content">
            <header>
                <div>
                    {/* Header */}
                    <img src="/assets/logo.png" alt="Logo" className="dashboard-logo" style={{ width: '200px', marginBottom: '20px' }} />
                </div>
                <div>
                    { user.name }
                     <a href='#' onClick ={onLogout} className="btn-logout">Salir</a>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
         </div>

    </div>
  )
}
