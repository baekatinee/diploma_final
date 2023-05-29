import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "./utils/consts";


const RequireAuth = observer(() =>  {
    const {user} = useContext(Context)
    
    const location = useLocation();
    return user.isAuth
        ? <Outlet />
        : <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
})

export default RequireAuth;