import React, { useContext, useState, useEffect  } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';
import { Context } from '..';
import { DASHBOARD_ROUTE, ADMIN_ROUTE, CLIENTS_ROUTE, PAYMENTS_ROUTE, SHIPS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Sidebar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const page = useLocation().pathname;

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
    await navigate('/');
    setShowConfirmation(false);
  };

  useEffect(() => {
    if (page === DASHBOARD_ROUTE) {
      handleMenuClick('dashboard');
    } else if (page === CLIENTS_ROUTE) {
      handleMenuClick('clients');
    } else if (page === ADMIN_ROUTE) {
      handleMenuClick('admin');
    } else if (page === PAYMENTS_ROUTE) {
      handleMenuClick('payments');
    } else if (page === SHIPS_ROUTE) {
      handleMenuClick('ships');
    }
  }, [page]);
  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  if (!user.isAuth) {
    return null;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CDBSidebar className="" textColor="black" backgroundColor="#F6F8FC">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link style={{ textDecoration: 'none', color: '#000' }} to={user.isAuth ? DASHBOARD_ROUTE : '/'}>
            Sailing Center
          </Link>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to={DASHBOARD_ROUTE}
              activeClassName="activeClicked"
              style={{ textDecoration: 'none' }}
              onClick={() => handleMenuClick('dashboard')}
            >
              <CDBSidebarMenuItem
                icon="columns"
                style={selectedMenu === 'dashboard' ? { backgroundColor: '#fce8fd', fontWeight: 'bold' } : {}}
                className={selectedMenu === 'dashboard' ? 'hovered' : ''}
              >
                Дашборд
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to={ADMIN_ROUTE}
              activeClassName="activeClicked"
              style={{ textDecoration: 'none' }}
              onClick={() => handleMenuClick('admin')}
            >
              <CDBSidebarMenuItem
                icon="address-book"
                style={selectedMenu === 'admin' ? { backgroundColor: '#ffd6d6', fontWeight: 'bold' } : {}}
                className={selectedMenu === 'admin' ? 'hovered' : ''}
              >
                Админ панель
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to={CLIENTS_ROUTE}
              activeClassName="activeClicked"
              style={{ textDecoration: 'none' }}
              onClick={() => handleMenuClick('clients')}
            >
              <CDBSidebarMenuItem
                icon="table"
                style={selectedMenu === 'clients' ? { backgroundColor: 'BlanchedAlmond', fontWeight: 'bold' } : {}}
                className={selectedMenu === 'clients' ? 'hovered' : ''}
              >
                Клиенты
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to={PAYMENTS_ROUTE}
              activeClassName="activeClicked"
              style={{ textDecoration: 'none' }}
              onClick={() => handleMenuClick('payments')}
            >
              <CDBSidebarMenuItem
                icon="credit-card"
                style={selectedMenu === 'payments' ? { backgroundColor: '#dbe6ff', fontWeight: 'bold' } : {}}
                className={selectedMenu === 'payments' ? 'hovered' : ''}
              >
                Оплаты
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to={SHIPS_ROUTE}
              activeClassName="activeClicked"
              style={{ textDecoration: 'none' }}
              onClick={() => handleMenuClick('ships')}
            >
              <CDBSidebarMenuItem
                icon="ship"
                style={selectedMenu === 'ships' ? { backgroundColor: '#e8fddd', fontWeight: 'bold' } : {}}
                className={selectedMenu === 'ships' ? 'hovered' : ''}
              >
                Судна
              </CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenuItem
              icon="times"
              onClick={exit}
              style={selectedMenu === 'exit' ? { backgroundColor: '#e8fddd', fontWeight: 'bold' } : {}}
              className={selectedMenu === 'exit' ? 'hovered' : ''}
            >
              Выйти
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
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
