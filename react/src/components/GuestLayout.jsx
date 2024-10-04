import { Navigate, Outlet } from "react-router"
import { useStateContext } from "../context/ContextProvider"


export const GuestLayout = () => {

    const {token} = useStateContext()



    if (token) {
        return <Navigate to="/inicio" />
    }

    return (

        <Outlet />

    )
}
