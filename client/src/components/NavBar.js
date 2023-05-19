import React, { useContext } from 'react'
import { Context } from '..';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ADMIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, CLIENTS_ROUTE, PAYMENTS_ROUTE, ARCHIVE_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = observer(() => {
    const navigate = useNavigate();
    const { user } = useContext(Context);

    return (
        <Navbar bg="white" className="mb-3">
            <Container>
                {user.isAuth && (
                    <Form className="d-flex w-100">
                        <Form.Control
                            type="search"
                            placeholder="Найти клиента"
                            aria-label="Search"
                            className="me-2"
                        />
                        <Button variant="primary">Поиск</Button>
  
                    </Form>
                   
                )}
            </Container>
        </Navbar>
    );
});
export default NavBar;