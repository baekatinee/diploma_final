import React, { useState, useEffect, useContext } from 'react'
import { Container, Button, Breadcrumb } from 'react-bootstrap'
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

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Container className='d-flex flex-column'>
  <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                   Админ панель
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className='d-flex'>
                <div onClick={() => setClientVisible(true)}
                    style={{
                        ...styles.container,
                        ...(isHovered ? styles.containerHover : {})
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div style={{ ...styles.square, ...styles.squareClient }}>
                        <PersonAdd size={35} color="Coral" />

                    </div>
                    <div style={styles.text}>Клиенты</div>
                </div>
                <div onClick={() => setShipVisible(true)} style={styles.container}>
                    <div style={{ ...styles.square, ...styles.squareShip }}>

                        <TruckFront size={35} color="ForestGreen" />
                    </div>
                    <div style={styles.text}>Судна</div>
                </div>
                <div onClick={() => setPaymentVisible(true)} style={styles.container}>
                    <div style={{ ...styles.square, ...styles.squarePayment }}>
                        <CreditCard size={35} color="#5375c6" />
                    </div>
                    <div style={styles.text}>Оплаты</div>
                </div>
                <div onClick={() => setTypeVisible(true)} style={styles.container}>
                    <div style={{ ...styles.square, ...styles.squareType }}>
                        <ListUl size={35} color="#f287f8" />
                    </div>
                    <div style={styles.text}>Тип судна</div>
                </div>
                <div onClick={() => setRentalVisible(true)} style={styles.container}>
                    <div style={{ ...styles.square, ...styles.squareRental }}>
                        <HouseAdd size={35} color="#f96262" />
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
    containerHover: {
        opacity: 0.8,
    },
    square: {
        width: '80px',
        height: '80px',
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