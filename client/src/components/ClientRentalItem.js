import React, { useState } from 'react';
import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import EditShip from './modals/EditShip';
import CreatePayment from '../components/modals/CreatePayment';
import { deleteRental } from '../http/rentalAPI';
import EditRental from './modals/EditRental';

const ClientRentalItem = ({ rental, clientObj, shipObj }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shipUpdateVisible, setUpdateShipVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [rentalVisible, setRentalVisible] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleDeleteRental = async (id) => {
        try {
            await deleteRental(id);
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpdateShip = () => {
        setUpdateShipVisible(true);
    };

    return (
        <Accordion.Item eventKey={rental.id}>
            <Accordion.Header onClick={toggleAccordion}>
                Аренда # {rental.id} {rental.dateStart} {rental.dateEnd}
            </Accordion.Header>
            <Accordion.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Судно</th>
                            <th>Бортовой номер</th>
                            <th>Длина</th>
                            <th>Парковочное место</th>
                            <th>Стоимость зима</th>
                            <th>Стоимость лето</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{shipObj.name}</td>
                            <td>{shipObj.number}</td>
                            <td>{shipObj.length}</td>
                            <td>{shipObj.parkingNumber}</td>
                            <td>{shipObj.priceWinter}</td>
                            <td>{shipObj.priceSummer}</td>
                            <td>
                                <Button variant="outline-dark" onClick={handleUpdateShip}>
                                    Изменить
                                </Button>{' '}
                                <EditShip
                                    key={shipObj.id}
                                    shipItem={shipObj}
                                    onHide={() => setUpdateShipVisible(false)}
                                    show={shipUpdateVisible}
                                />
                                <Button variant="outline-danger" onClick={handleDeleteRental}>
                                    Удалить
                                </Button>{' '}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col md={9}> <Button

                        className='mt-2'
                        variant="primary"
                        onClick={() => setPaymentVisible(true)}
                    >
                        Добавить оплату
                    </Button>{' '}
                        <CreatePayment 
                            show={paymentVisible}
                            clientId={clientObj.id}
                            rentalId={rental.id}
                            onHide={() => setPaymentVisible(false)}
                        /></Col>
                    <Col md={3} className='d-flex justify-content-end'>
                        <Button
                            className='mt-2'
                            variant="outline-dark"
                            onClick={() => setRentalVisible(true)}
                        >
                            Изменить
                        </Button>{' '}
                        <EditRental
                            show={rentalVisible}
                            rental={rental}
                            clientId={clientObj.id}
                            shipId={shipObj.id}
                            onHide={() => setRentalVisible(false)}
                        />
                        <Button
                            className='mt-2'
                            variant="outline-danger"
                        >
                            Удалить
                        </Button>{' '}</Col>

                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default ClientRentalItem;