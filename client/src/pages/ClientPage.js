import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Form, Button, Badge, Table, Col, Breadcrumb } from 'react-bootstrap';
import checkedStatus from '../img/checked.png';
import uncheckedStatus from '../img/warning.png';
import debt from '../img/debt.png';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteClient, fetchOneClient } from '../http/clientAPI';
import { fetchRentals } from '../http/rentalAPI';
import { fetchShips } from '../http/shipAPI';
import EditClient from '../components/modals/Edit/EditClient';
import ClientRentalList from '../components/Rentals/ClientRentalList';
import { fetchPayments } from '../http/paymentAPI';
import CreateRental from '../components/modals/CreateRental';
import ClientPaymentList from '../components/Payments/ClientPaymentList';
import { fetchTypes } from '../http/typeAPI';
import ConfirmDeleteModal from '../components/modals/Confirm/ConfirmDeleteModal';

const ClientPage = observer(() => {
    const { rental, ship, payment } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClientData] = useState('');
    const [clientUpdateVisible, setUpdateClientVisible] = useState(false);
    const [rentalVisible, setRentalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const deleteClientAndRedirect = async () => {
        try {
            await deleteClient(client.id);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при удалении клиента');
        }
    };

    useEffect(() => {
        fetchOneClient(id).then(data => setClientData(data));
        fetchRentals().then(data => {
            if (rental) {
                rental.setRentals(data.rows);
            }
        });
        fetchShips(null, 1, 5).then(data => {
            ship.setShips(data.rows);
            ship.setTotalCount(data.count);
        });
        fetchTypes().then(data => ship.setTypes(data));
        fetchPayments().then(data => {
            if (payment) {
                payment.setPayments(data.rows);
            }
        });
    }, [rental]);

    useEffect(() => {
        fetchShips(ship.selectedType.id, ship.page, 5).then(data => {
            ship.setShips(data.rows);
            ship.setTotalCount(data.count);
        });
    }, [ship.page, ship.selectedType]);
    const handleCreateRental = async () => {
        try {
            setRentalVisible(true);
            await fetchRentals().then(data => {
                if (rental) {
                    rental.setRentals(data.rows);
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Медник Давид Гедальевич
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className='border-0 bg-light mt-2 p-2'>
                <Card className='border-0 p-4 mb-3'>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                        <Row className='d-flex justify-content-between align-items-center' style={{ width: '100%' }}>
                            <Col md={9} className='d-flex align-items-center '>
                                <div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: '1rem' }}>{client.surname} </div>
                                <div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: '1rem' }}>{client.name} </div>
                                <div style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: '1rem' }}>{client.fathersName}</div>
                                {client.hasPaid ? (
                                    <Badge pill bg='success'>
                                        Оплачено
                                    </Badge>
                                ) : (
                                    <Badge pill bg='danger'>
                                        Долг
                                    </Badge>
                                )}
                            </Col>
                            <Col md={3} className='d-flex align-items-center justify-content-end'>
                                <Button variant='outline-dark' onClick={() => setUpdateClientVisible(true)}>
                                    Изменить
                                </Button>{' '}
                                <EditClient
                                    key={client.id}
                                    client={client}
                                    onHide={() => setUpdateClientVisible(false)}
                                    show={clientUpdateVisible}
                                />
                                <Button variant='outline-danger' style={{ marginLeft: '1rem' }} onClick={() => setConfirmDeleteVisible(true)}>
                                    Удалить
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Title border='primary'></Card.Title>
                    <Form className='d-flex justify-content-between'>
                        <Table hover style={{ width: '40vw' }}>
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
                            <Card className='border-0 p-1 d-flex align-items-center' style={{ width: '15vw', marginRight: '1rem' }}>
                                {client.hasPaid ? (
                                    <Card.Img src={checkedStatus} variant='top' style={{ width: '3vw', height: '3vw' }} />
                                ) : (
                                    <Card.Img src={uncheckedStatus} variant='top' style={{ width: '3vw', height: '3vw' }} />
                                )}
                                <Card.Body className='d-flex flex-column align-items-center'>
                                    <Card.Title>Статус оплаты</Card.Title>
                                    <Card.Text>
                                        {client.hasPaid ? (
                                            <Badge pill bg='success'>
                                                Оплачено
                                            </Badge>
                                        ) : (
                                            <Badge pill bg='danger'>
                                                Долг
                                            </Badge>
                                        )}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {client.hasPaid ? (
                                ""
                            ) : (
                                <Card className='border-0 p-1 d-flex align-items-center' style={{ width: '15vw' }}>
                                    <Card.Img variant='top' src={debt} style={{ width: '3vw', height: '3vw' }} />
                                    <Card.Body className='d-flex flex-column align-items-center'>
                                        <Card.Title>Задолженность</Card.Title>
                                        <Card.Text style={{ fontWeight:'bold', fontSize:'1.5rem' }}>350 BYN</Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>


                    </Row>
                </Card>
                <Card className=' border-0 p-4 mb-3'>
                    <Card.Title border='primary' className='d-flex justify-content-between align-items-center'>
                        <div>Текущие аренды</div>
                        <Button className='mt-2' variant='outline-dark' onClick={() => handleCreateRental()}>
                            Добавить аренду
                        </Button>{' '}
                        <CreateRental clientId={client.id} show={rentalVisible} onHide={() => setRentalVisible(false)}></CreateRental>
                    </Card.Title>
                    <ClientRentalList clientId={client.id} ></ClientRentalList>
                </Card>
                <Card className=' border-0 p-4 mb-3'>
                    <Card.Title border='primary'>История оплат</Card.Title>
                    <ClientPaymentList clientId={client.id}></ClientPaymentList>
                </Card>
            </Card>
            <ConfirmDeleteModal
                show={confirmDeleteVisible}
                onHide={() => setConfirmDeleteVisible(false)}
                deleteAction={deleteClientAndRedirect}
                deleteParam={client.id}
            />
        </Container>
    );
});
export default ClientPage;
