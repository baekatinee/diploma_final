import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Clients from "./pages/Clients"
import ClientPage from "./pages/ClientPage"
import Payments from "./pages/Payments"
import Dashboard from "./pages/Dashboard"
import HomePage from "./pages/HomePage"
import ArchiveClients from "./pages/ArchiveClients"
import { HOME_ROUTE,ADMIN_ROUTE, ARCHIVE_ROUTE, CLIENTS_ROUTE, CLIENT_ROUTE, DASHBOARD_ROUTE, PAYMENTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ARCHIVE_ROUTE,
        Component: ArchiveClients
    },
    {
        path: CLIENTS_ROUTE,
        Component: Clients
    },
    {
        path: DASHBOARD_ROUTE,
        Component: Dashboard,
    
    },
    {
        path: CLIENT_ROUTE + '/:id',
        Component: ClientPage,
   
    },
    {
        path: PAYMENTS_ROUTE,
        Component: Payments
    },
]
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE ,
        Component: Auth
    },
    {
        path:HOME_ROUTE ,
        Component: HomePage
    },
]