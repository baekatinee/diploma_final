import React, { useState } from 'react';
import { Accordion, Button, Col, Row, Table } from 'react-bootstrap';
import EditShip from './modals/EditShip';
import CreatePayment from '../components/modals/CreatePayment';
import { deleteRental, fetchRentals } from '../http/rentalAPI';
import EditRental from './modals/EditRental';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const ClientRentalItem = ({ rental, handleDelete, clientObj, shipObj }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shipUpdateVisible, setUpdateShipVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const [rentalVisible, setRentalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const deleteOne = async (e) => {

        try {
          await handleDelete(rental.id);
          setConfirmDeleteVisible(false);
        } catch (error) {
          console.log(error);
        }
      };
    
      const openEditModal = (e) => {
        setUpdateShipVisible(true);
      };
      const openConfirmDeleteModal = (e) => {
        setConfirmDeleteVisible(true);
      };
      const closeConfirmDeleteModal = () => {
        setConfirmDeleteVisible(false);
      };
      const confirmDelete = () => {
        deleteOne();
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
                            <td className='d-flex justify-content-around'>
                        
                                <EditButton onClick={openEditModal} />
                                <EditShip
                                    shipItem={shipObj}
                                    show={shipUpdateVisible}
                                    onHide={() => setUpdateShipVisible(false)}
                                />
                                <DeleteButton onClick={openConfirmDeleteModal} />

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
                            style={{ marginRight: "1rem" }}
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
                            onClick={deleteOne}
                        >
                            Удалить
                        </Button>{' '}</Col>

                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default ClientRentalItem;