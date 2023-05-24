import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, Row, Form, Button, Badge, Table } from 'react-bootstrap'
import checkedStatus from '../img/checked.png'
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
            <Card className='bg-light mt-5 p-4' >
                <Card className='p-4 mb-3'>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                        <Form className='d-flex justify-content-between align-items-center' style={{ width: "40vw" }}>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.surname} </div>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.name} </div>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.fathersName}</div>
                            <Badge pill bg="success">
                                {status}
                            </Badge>{' '}
                        </Form>
                        <Form className='d-flex justify-content-between' style={{ width: "18vw" }}>
                            <Button variant="outline-dark" onClick={() => setUpdateClientVisible(true)}>
                                Изменить
                            </Button>{' '}
                            <EditClient
                                key={client.id}
                                client={client}
                                onHide={() => setUpdateClientVisible(false)}
                                show={clientUpdateVisible}
                            />
                            <Button variant="outline-secondary">Выезд</Button>{' '}
                            <Button variant="outline-danger" onClick={deleteOne}>Удалить</Button>{' '}
                        </Form></Card.Header>
                    <Card.Title border="primary" >
                    </Card.Title>
                    <Form className='d-flex justify-content-between'>
                        <Table striped bordered hover style={{ width: "40vw" }} >
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
                    <Form className='d-flex justify-content-between align-items-center'>
                        <Form className='d-flex flex-row'>
                            <Card className='p-1 d-flex align-items-center' style={{ width: "15vw" }}>
                                <Card.Img variant="top" src={checkedStatus} style={{ width: "3vw", height: "3vw" }} />
                                <Card.Body>
                                    <Card.Title>Статус оплаты</Card.Title>
                                    <Card.Text>
                                        <Badge bg="success">
                                            {status}
                                        </Badge>{' '}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card className='p-1 d-flex align-items-center' style={{ width: "15vw" }}>
                                <Card.Img variant="top" src={checkedStatus} style={{ width: "3vw", height: "3vw" }} />
                                <Card.Body>
                                    <Card.Title>Задолженность</Card.Title>
                                    <Card.Text>
                                        0 BYN
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Form>
                        <Form>
                            <Button variant="primary">Внести оплату</Button>{' '}
                        </Form>
                    </Form>
                </Card>
                <Card className='p-4 mb-3'>
                    <Card.Title border="primary" className='d-flex justify-content-between align-items-center' >
                        <div>   Текущие аренды</div>
                        <Button
                          
                            className='mt-2'
                            variant="outline-dark"
                            onClick={() => setRentalVisible(true)}>
                            Добавить аренду</Button>{' '}
                        <CreateRental show={rentalVisible} onHide={() => setRentalVisible(false)}></CreateRental>
                    </Card.Title>
                    <ClientRentalList clientId={client.id}></ClientRentalList>
                </Card>
                <Card className='p-4 mb-3'>
                    <Card.Title border="primary" >
                        История оплат
                    </Card.Title>
             <ClientPaymentList  clientId={client.id}></ClientPaymentList>
                </Card>
            </Card>

        </Container>
    )
})
export default ClientPage;