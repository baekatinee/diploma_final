import React, { useState, useEffect, useContext } from 'react'
import { Container, Button, Breadcrumb, Row, Col } from 'react-bootstrap'
import CreateClient from '../components/modals/CreateClient';
import CreateShip from '../components/modals/CreateShip';
import CreateType from '../components/modals/CreateType';
import CreateRental from '../components/modals/CreateRental';
import { CreditCard, HouseAdd, ListUl, PersonAdd, TruckFront } from 'react-bootstrap-icons'
import { Context } from '..';
import { fetchClients } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import { fetchPayments } from '../http/paymentAPI';
import CreatePayment from '../components/modals/CreatePayment';
const Admin = () => {
    const { client, rental, ship, payment } = useContext(Context)
    useEffect(() => {
        fetchClients().then(data => {
            if (client) {
                client.setClients(data.rows);
            }
        });
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
        fetchShips().then(data => {
            if (ship) {
                ship.setShips(data.rows);
            }
        });
    }, []);
    const [typeVisible, setTypeVisible] = useState(false)
    const [clientVisible, setClientVisible] = useState(false)
    const [shipVisible, setShipVisible] = useState(false)
    const [paymentVisible, setPaymentVisible] = useState(false)
    const [rentalVisible, setRentalVisible] = useState(false)

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);
    return (
        <Container className='d-flex flex-column'>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Админ панель
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row className='mb-2'>
                <Col >
                    <h1>
                        Добавить
                    </h1>
                </Col>

            </Row>
            <div className='d-flex flex-wrap'>
                <div onClick={() => setClientVisible(true)}
                    style={
                        styles.container}>
                    <div style={{ ...styles.square, ...styles.squareClient, ...(isHovered1 ? styles.containerHover1 : {}) }}
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}>
                        <PersonAdd size={50} color="Coral" />

                    </div>
                    <div style={styles.text}>Клиент</div>
                </div>
                <div onClick={() => setShipVisible(true)} style={
                    styles.container}>
                    <div style={{ ...styles.square, ...styles.squareShip, 
                    ...(isHovered2 ? styles.containerHover2 : {}) }}
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}>
 
                        <div size={50} color="ForestGreen"  prefix={<i className="fa fa-ship"></i>}></div>
                    </div>
                    <div style={styles.text}>Судно</div>
                </div>
                <div onClick={() => setPaymentVisible(true)} style={
                    styles.container}>
                    <div style={{ ...styles.square, ...styles.squarePayment, 
                    ...(isHovered3 ? styles.containerHover3 : {}) }}
                        onMouseEnter={() => setIsHovered3(true)}
                        onMouseLeave={() => setIsHovered3(false)}>
                        <CreditCard size={50} color="#5375c6" />
                    </div>
                    <div style={styles.text}>Оплата</div>
                </div>
                <div onClick={() => setTypeVisible(true)} style={
                    styles.container}>
                    <div style={{ ...styles.square, ...styles.squareType, 
                    ...(isHovered4? styles.containerHover4 : {}) }}
                        onMouseEnter={() => setIsHovered4(true)}
                        onMouseLeave={() => setIsHovered4(false)}>
                        <ListUl size={50} color="#f287f8" />
                    </div>
                    <div style={styles.text}>Тип судна</div>
                </div>
                <div onClick={() => setRentalVisible(true)} style={
                    styles.container}>
                    <div style={{ ...styles.square, ...styles.squareRental, ...(isHovered5 ? styles.containerHover5 : {}) }}
                        onMouseEnter={() => setIsHovered5(true)}
                        onMouseLeave={() => setIsHovered5(false)}>
                        <HouseAdd size={50} color="#f96262" />
                    </div>
                    <div style={styles.text}>Аренда</div>
                </div>
            </div>

            <CreateClient show={clientVisible} onHide={() => setClientVisible(false)}></CreateClient>
            <CreateShip show={shipVisible} onHide={() => setShipVisible(false)}></CreateShip>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}></CreateType>
            <CreateRental show={rentalVisible} onHide={() => setRentalVisible(false)}></CreateRental>
            <CreatePayment show={paymentVisible} onHide={() => setPaymentVisible(false)}></CreatePayment>
        </Container>
    )


}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
    },
    containerHover1: {
        backgroundColor: '#f6e9d2',
    },
    containerHover2: {
        backgroundColor: '#eaf7e7',
    },
    containerHover3: {
        backgroundColor: '#e2e8f2',
    },
    containerHover4: {
        backgroundColor: '#f7eef7',
    },
    containerHover5: {
        backgroundColor: '#f1e4e4',
    },
    square: {
        width: '200px',
        height: '200px',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    squarePayment: {
        backgroundColor: '#dbe6ff',
    },
    squareClient: {
        backgroundColor: 'BlanchedAlmond',
    },
    squareShip: {
        backgroundColor: '#e8fddd',
    },
    squareType: {
        backgroundColor: '#fce8fd',
    },
    squareRental: {
        backgroundColor: '#ffd6d6',
    },
    text: {
        marginTop: '10px',
        fontSize: '16px',
        fontWeight: '600',
    },
};

export default Admin;