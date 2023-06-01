import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, Row, Form, Button, Badge, Table, Col } from 'react-bootstrap'
import checkedStatus from '../img/checked.png'
import uncheckedStatus from '../img/warning.png'
import debt from '../img/debt.png'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useParams } from 'react-router-dom';
import { deleteClient, fetchOneClient } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import EditClient from '../components/modals/EditClient';
import ClientRentalList from '../components/ClientRentalList';
import { fetchPayments } from '../http/paymentAPI';
import CreateRental from '../components/modals/CreateRental';
import PaymentList from '../components/PaymentList';
import ClientPaymentList from '../components/ClientPaymentList';

const ClientPage = observer(() => {
    const { rental, ship, payment } = useContext(Context);
    const { id } = useParams();
    const [client, setClientData] = useState('');
    const [clientUpdateVisible, setUpdateClientVisible] = useState(false);
    const [rentalVisible, setRentalVisible] = useState(false)

    useEffect(() => {
        fetchOneClient(id).then(data => setClientData(data));
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
        fetchPayments().then(data => {
            if (payment) {
                payment.setPayments(data.rows);
            }
        });
    }, []);

    const deleteOne = async () => {
        try {
            await deleteClient(client.id);
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при удалении клиента');
        }
    };

    const status = "Оплачено"
    return (
        <Container>
            <Card className='border-0 bg-light mt-5 p-4' >
                <Card className='border-0 p-4 mb-3'>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                        <Row className='d-flex justify-content-between align-items-center' style={{ width: "100%" }}>
                            <Col md={9} className='d-flex align-items-center'>

                                <div style={{ fontWeight: "bold", fontSize: "2rem", marginRight: "1rem" }}>{client.surname} </div>
                                <div style={{ fontWeight: "bold", fontSize: "2rem", marginRight: "1rem" }}>{client.name} </div>
                                <div style={{ fontWeight: "bold", fontSize: "2rem", marginRight: "1rem" }}>{client.fathersName}</div>
                                {client.hasPaid ? (
                                    <Badge pill bg="success">
                                        Оплачено
                                    </Badge>
                                ) : (
                                    <Badge pill bg="danger">
                                        Долг
                                    </Badge>
                                )}
                            </Col>
                            <Col md={3} className='d-flex align-items-center justify-content-end'>
                                <Button variant="outline-dark" onClick={() => setUpdateClientVisible(true)}>
                                    Изменить
                                </Button>{' '}
                                <EditClient
                                    key={client.id}
                                    client={client}
                                    onHide={() => setUpdateClientVisible(false)}
                                    show={clientUpdateVisible}
                                />
                                <Button variant="outline-danger" style={{ marginLeft: "1rem" }} onClick={deleteOne}>Удалить</Button>{' '}
                            </Col>
                        </Row></Card.Header>
                    <Card.Title border="primary" >
                    </Card.Title>
                    <Form className='d-flex justify-content-between'>
                        <Table hover style={{ width: "40vw" }} >
                            <tbody>
                                <tr>
                                    <td>Номер телефона</td>
                                    <td>{client.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{client.email}</td>
                                </tr>
                                <tr>
                                    <td>Комментрии</td>
                                    <td>{client.comment}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                    <Row>
                        <Col className='d-flex ' md={8}>
                            <Card className='border-0 p-1 d-flex align-items-center' style={{ width: "15vw", marginRight: "1rem" }}>
                                <Card.Img src={uncheckedStatus} variant="top" style={{ width: "3vw", height: "3vw" }} />
                                <Card.Body>
                                    <Card.Title>Статус оплаты</Card.Title>
                                    <Card.Text>
                                        <Badge bg="danger">
                                            Долг
                                        </Badge>{' '}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='border-0 p-1 d-flex align-items-center' style={{ width: "15vw" }}>
                                <Card.Img icon="ship" variant="top" src={debt} style={{ width: "3vw", height: "3vw" }} />
                                <Card.Body>
                                    <Card.Title>Задолженность</Card.Title>
                                    <Card.Text>
                                        350 BYN
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className='d-flex align-items-center justify-content-end'>

                            <Button variant="outline-dark">Уведомить клиента</Button>{' '}
                        </Col>
                    </Row>
                </Card>
                <Card className=' border-0 p-4 mb-3'>
                    <Card.Title border="primary" className='d-flex justify-content-between align-items-center' >
                        <div>   Текущие аренды</div>
                        <Button
                            className='mt-2'
                            variant="outline-dark"
                            onClick={() => setRentalVisible(true)}>
                            Добавить аренду</Button>{' '}
                        <CreateRental clientId={client.id} show={rentalVisible} onHide={() => setRentalVisible(false)}></CreateRental>
                    </Card.Title>
                    <ClientRentalList clientId={client.id}></ClientRentalList>
                </Card>
                <Card className=' border-0 p-4 mb-3'>
                    <Card.Title border="primary" >
                        История оплат
                    </Card.Title>
                    <ClientPaymentList clientId={client.id}></ClientPaymentList>
                </Card>
            </Card>

        </Container>
    )
})
export default ClientPage;