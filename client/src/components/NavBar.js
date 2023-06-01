import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import { Button, Container, Form, Nav, Navbar, Row, Col } from 'react-bootstrap';
import { fetchClients } from '../http/clientAPI';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import CreateClient from '../components/modals/CreateClient';

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { client, user } = useContext(Context);
  const [clientVisible, setClientVisible] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const handleAddClient = async () => {
    setClientVisible(true);
    setUpdateFlag(true); // Обновляем данные клиентов после добавления нового клиента
  };
  const handleCloseModal = () => {
    setClientVisible(false);
  };
  const fetchData = async () => {
    await Promise.all([fetchClients()]).then(
      ([clientsData, paymentsData, rentalsData, shipsData]) => {
        if (client) {
          client.setClients(clientsData.rows);
        }
      }
    );
  };
  useEffect(() => {
    fetchClients().then(data => {
      if (client) {
        client.setClients(data.rows);
      }
    });
  },);
  return (
    <Navbar className="mb-3 mt-3">
      <Container>
        <Row className='w-100'>
          <Col md={9}>
            {user.isAuth && (
              <Form className="d-flex w-100">
                <div className="input-group" style={{ width: "60%" }}>

                  <input
                    style={{ backgroundColor: "#EAF1FB" }}
                    type="search"
                    className="form-control rounded border-0"
                    placeholder="Найти клиента, судно"
                    aria-label="Search"
                  />
                  <Button variant="primary" className="input-group-append">
                    <i className="bi bi-search"></i>
                  </Button>
                </div>
              </Form>
            )}
          </Col>
          <Col md={3} className='d-flex justify-content-end'>

            <Button variant="primary" onClick={handleAddClient}>
              Добавить клиента
            </Button>
            <CreateClient show={clientVisible} onHide={handleCloseModal} />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
});

export default NavBar;