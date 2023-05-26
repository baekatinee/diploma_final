import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Card, CardGroup, Button } from 'react-bootstrap';
import StatusBar from '../components/StatusBar';
import CreateClient from '../components/modals/CreateClient';
import ClientList from '../components/ClientList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import RentalList from '../components/RentalList';
import PaymentList from '../components/PaymentList';
import { fetchPayments } from '../http/paymentAPI';
import CustomRadialBarChart from '../components/diagramma/CustomRadialBarChart';

const Dashboard = observer(() => {
  const { client, rental, ship, payment } = useContext(Context);
  const [clientVisible, setClientVisible] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  useEffect(() => {
    fetchPayments().then(data => {
      if (payment) {
        payment.setPayments(data.rows);
      }
    });
    fetchRentals().then(data => {
      if (rental) {
        rental.setRentals(data.rows);
      }
    });
    fetchClients().then(data => {
      if (client) {
        client.setClients(data.rows);
      }
    });
    fetchShips().then(data => {
      if (ship) {
        ship.setShips(data.rows);
      }
    });
  },);

  const fetchData = async () => {
    await Promise.all([fetchClients(), fetchPayments(), fetchRentals(), fetchShips()]).then(
      ([clientsData, paymentsData, rentalsData, shipsData]) => {
        if (client) {
          client.setClients(clientsData.rows);
        }
        if (payment) {
          payment.setPayments(paymentsData.rows);
        }
        if (rental) {
          rental.setRentals(rentalsData.rows);
        }
        if (ship) {
          ship.setShips(shipsData.rows);
        }
      }
    );
  };

  const handleAddClient = async () => {
    setClientVisible(true);
    setUpdateFlag(true); // Обновляем данные клиентов после добавления нового клиента
  };

  const handleCloseModal = () => {
    setClientVisible(false);
  };

  return (
    <Container>
      <Card className="p-5" style={{ backgroundColor: '#F8F8F8' }}>
        <Row className="mb-4">
          <CardGroup className="justify-content-between">
            <Card className="shadow" style={{ flex: '0 0 30%' }}>
              <CustomRadialBarChart />
            </Card>
            <Card className="shadow" style={{ flex: '0 0 30%' }}>
              <CustomRadialBarChart />
            </Card>
            <Card className="shadow" style={{ flex: '0 0 30%' }}>
              <CustomRadialBarChart />
            </Card>
          </CardGroup>
        </Row>
        <Row className="mb-3">
          <Col md={10}>
            <CardGroup className="justify-content-between">
              <Card bg="light" className="shadow" style={{ flex: '1' }}>
                <Card.Header>Общая выручка за сезон</Card.Header>
                <Card.Body>
                  <Card.Title>3000 BYN</Card.Title>
                  <Card.Text>+2.5% по сравнению с прошлым годом</Card.Text>
                </Card.Body>
              </Card>
              <Card className="shadow" style={{ flex: '1' }}>
                <Card.Header>Общая задолженность</Card.Header>
                <Card.Body>
                  <Card.Title>150 BYN</Card.Title>
                  <Card.Text>-0.7% по сравнению с прошлым месяцем</Card.Text>
                </Card.Body>
              </Card>
              <Card className="shadow " style={{ flex: '1' }}>
                <Card.Header>Клиентов с долгом</Card.Header>
                <Card.Body>
                  <Card.Title>15</Card.Title>
                  <Card.Text>+2.5% по сравнению с прошлым месяцем</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <Button variant="outline-dark" onClick={handleAddClient}>
              Добавить клиента
            </Button>
            <CreateClient show={clientVisible} onHide={handleCloseModal} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={12}>
            <Card className="shadow p-4">
              <Card.Title className="p-3">Клиенты с задолженностью</Card.Title>
              <ClientList updateFlag={updateFlag} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="shadow p-4">
              <Card.Title className="p-3">Последние аренды</Card.Title>
              <RentalList />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow p-4">
              <Card.Title className="p-3">Последние оплаты</Card.Title>
              <PaymentList />
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
});

export default Dashboard;