import React, { useContext, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, CLIENTS_ROUTE, PAYMENTS_ROUTE, ARCHIVE_ROUTE, SHIPS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Sidebar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const exit = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = async () => {
    localStorage.removeItem('token');
    user.setUser({});
    user.setIsAuth(false);
    await navigate(HOME_ROUTE);
    localStorage.removeItem('token');
    setShowConfirmation(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CDBSidebar className="" textColor="black" backgroundColor="white">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link style={{ textDecoration: 'none', color: "#000" }} to={user.isAuth ? DASHBOARD_ROUTE : HOME_ROUTE}>Sailing Center</Link>
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
                <CDBSidebarMenuItem icon="credit-card">Оплаты</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to={ADMIN_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="address-book">Админ панель</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to={SHIPS_ROUTE} activeclassname="activeClicked">
                <CDBSidebarMenuItem icon="ship">Судна</CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="times" onClick={exit}>
                Выйти
              </CDBSidebarMenuItem>
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

      <Modal show={showConfirmation} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение выхода</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите выйти?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Выйти
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default Sidebar;