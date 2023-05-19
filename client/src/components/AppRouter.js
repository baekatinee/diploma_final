import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { HOME_ROUTE, LOGIN_ROUTE,DASHBOARD_ROUTE } from '../utils/consts';

import { Context } from '..';
import Dashboard from '../pages/Dashboard';

const AppRouter = () => {

    const { user } = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component, requiresAuth }) =>
                <Route key={path} path={path} element={requiresAuth ? (user.isAuth ? <Component /> : <Navigate to={LOGIN_ROUTE} />) : <Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            <Route
                path={DASHBOARD_ROUTE}
                element={user.isAuth ? <Dashboard /> : <Navigate to={LOGIN_ROUTE} />}
            />
            <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
        </Routes>

    )
}
export default AppRouter;