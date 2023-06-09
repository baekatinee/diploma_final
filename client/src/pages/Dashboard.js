import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Card} from 'react-bootstrap';
import ClientList from '../components/Clients/ClientList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import RentalList from '../components/Rentals/RentalList';
import PaymentList from '../components/Payments/PaymentList';
import { fetchPayments } from '../http/paymentAPI';
import CustomRadialBarChart from '../components/diagramma/CustomRadialBarChart';
import MyChart from '../components/diagramma/MyChart';
import GradientDiv from '../components/diagramma/GradientDiv';
import { fetchTypes } from '../http/typeAPI';
import { NavLink } from 'react-router-dom';
import { CLIENTS_ROUTE, PAYMENTS_ROUTE, RENTAL_ROUTE } from '../utils/consts';

const Dashboard = observer(() => {
  const { client, rental, ship, payment } = useContext(Context);
  const data = [
    {
      name: 'Апрель',
      BYN: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Май',
      BYN: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Июнь',
      BYN: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Июль',
      BYN: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Август',
      BYN: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Сентябрь',
      BYN: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];
  useEffect(() => {
    fetchShips(ship.selectedType.id, ship.page, 5).then((data) => {
        ship.setShips(data.rows);
        ship.setTotalCount(data.count);
    });
}, [ship.page,ship.selectedType ]);
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
    fetchShips(null, 1, 5).then((data) => {
      ship.setShips(data.rows);
      ship.setTotalCount(data.count);
  });
  fetchTypes().then((data) => ship.setTypes(data));
  },);




  return (
    <Container >
      <Row className='mb-4'>
        <GradientDiv colorLeft={"#ff8080"} colorRight={"#ffcc80"} number={"1000"} subtitle={"Общая выручка за сезон"} progress={60} />
        <GradientDiv colorLeft={"#BE48B0"} colorRight={"#5E93F2"} number={"30"} subtitle={"Клиентов в яхт-клубе"} progress={50} />
        <GradientDiv colorLeft={"#9D18AF"} colorRight={"#F551B9"} number={"60"} subtitle={"Арендованных мест"} progress={40} />
        <GradientDiv colorLeft={"#32DCB2"} colorRight={"#3FFD91"} number={"3"} subtitle={"Клиентов с задолженностью"} progress={30} />
      </Row>
      <Row className="d-flex">
        <Col style={{ flex: 1 }} md={7}>
          <Card className="p-4 border-0 border-radius-50" style={{ backgroundColor: "#FFFF" }}>
            <Row>
              <h4 style={styles.title3}>
                Выручка
              </h4>
            </Row>
            <Row>
              <MyChart data={data} />
            </Row>
          </Card>
        </Col>
        <Col style={{ flex: 1}} md={5}>
          <Card className="p-4 border-0 border-radius-50" style={{ backgroundColor: "#FFFF" }}>
            <Row>
              <h4 style={styles.title3}>
                Клиенты
              </h4>
            </Row>
            <Row>
              <CustomRadialBarChart />
            </Row>      </Card></Col>
      </Row>
      <Row className="my-3">
        <Col md={12}>
          <Card className="p-4 border-0" >
            <Card.Title className="p-3">Клиенты с задолженностью</Card.Title>
            <ClientList showOnlyDebt={true}/>
            <NavLink to={CLIENTS_ROUTE}>Все клиенты</NavLink>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="p-4 border-0">
            <Card.Title className="p-3">Последние аренды</Card.Title>
            <RentalList />
          </Card>
        </Col>
        <Col md={6}>
          <Card className=" p-4 border-0">
            <Card.Title className="p-3">Последние оплаты</Card.Title>
            <PaymentList />
            <NavLink to={PAYMENTS_ROUTE}>Все оплаты</NavLink>
          </Card>
        </Col>
      </Row>

    </Container>
  );
});

const styles = {

  title3: {
    fontSize: "1.25rem",
    fontWeight: "600"

  }
}
export default Dashboard;