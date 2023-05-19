import React, { useContext } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Context } from '..';
import { HiLogout, HiCog } from 'react-icons/hi';
import { ADMIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, CLIENTS_ROUTE, PAYMENTS_ROUTE, ARCHIVE_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const exit = async () => {
    localStorage.removeItem('token')
    user.setUser({});
    user.setIsAuth(false);
    await navigate(HOME_ROUTE);
    console.log(user.isAuth);
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CDBSidebar className="" textColor="black" backgroundColor="white">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link  style={{ textDecoration: 'none', color:"#000" }} to={user.isAuth ? DASHBOARD_ROUTE : HOME_ROUTE}>Sailing Center</Link>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          {user.isAuth ? (
            <CDBSidebarMenu>
              <NavLink to={DASHBOARD_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="columns">Дашборд</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to={CLIENTS_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="table">Клиенты</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to={PAYMENTS_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="user">Оплаты</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to={ADMIN_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="address-book">
                  Админ панель
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink onClick={exit} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="times" >
                  Выйти
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          ) : (
            <CDBSidebarMenu>
              <NavLink to={LOGIN_ROUTE}>
                <CDBSidebarMenuItem icon="user">Авторизация</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          )}
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  );
});

export default Sidebar;
