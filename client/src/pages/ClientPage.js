import React, { useContext, useEffect, useState } from 'react'
import { Container, Card, Row, Form, Button, Badge, Table } from 'react-bootstrap'
import checkedStatus from '../img/checked.png'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useParams } from 'react-router-dom';
import { deleteClient, fetchOneClient } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import RentalList from '../components/RentalList';

const ClientPage = observer(() => {
    const {  rental, ship } = useContext(Context);
    const { clientId } = useParams();
    const [client, setClientData] = useState('');

    useEffect(() => {
        fetchOneClient(clientId).then(data => setClientData(data));
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
                        <Form className='d-flex justify-content-between align-items-center' style={{ width: "35vw" }}>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.surname}</div>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.name}</div>
                            <div style={{ fontWeight: "bold", fontSize: "2rem" }}>{client.fathersName}</div>
                            <Badge pill bg="success">
                                {status}
                            </Badge>{' '}
                        </Form>
                        <Form className='d-flex justify-content-between' style={{ width: "18vw" }}>
                            <Button variant="primary">Изменить</Button>{' '}
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
                        <Table striped bordered hover style={{ width: "35vw" }} >
                            <tbody>
                                <tr>
                                    <td>Судно</td>
                                    <td>{ship.name}</td>
                                </tr>
                                <tr>
                                    <td>Бортовой номер</td>
                                    <td>{ship.number}</td>
                                </tr>
                                <tr>
                                    <td>Место стоянки</td>
                                    <td>{ship.parkingNumber}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                    <Table striped bordered hover style={{ width: "40vw" }} >
                        <tbody>
                            <tr>
                                <td>Стоимость зима</td>
                                <td>{ship.priceWinter}</td>
                            </tr>
                            <tr>
                                <td>Стоимость лето</td>
                                <td>{ship.priceSummer}</td>
                            </tr>
                        </tbody>
                    </Table>
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
                    <Card.Title border="primary" >
                        Аренда
                    </Card.Title>
                    <RentalList clientId={client.id}></RentalList>
                </Card>
                <Card className='p-4 mb-3'>
                    <Card.Title border="primary" >
                        История оплат
                    </Card.Title>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Дата оплаты</th>
                                <th>Сумма</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Дата оплаты</td>
                                <td>Сумма</td>
                                <td>Имя</td>
                            </tr>
                            <tr>
                                <td>Дата оплаты</td>
                                <td>Сумма</td>
                                <td>Имя</td>
                            </tr>
                            <tr>
                                <td>Дата оплаты</td>
                                <td>Сумма</td>
                                <td>Имя</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Card>

        </Container>
    )
})
export default ClientPage;