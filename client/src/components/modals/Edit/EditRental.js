import React, { useContext, useState, useEffect } from 'react';
import { Modal, Form, Button, FormControl, Col, Row } from 'react-bootstrap';
import { Context } from '../../..';
import { updateRental } from '../../../http/rentalAPI';
import { fetchClients } from '../../../http/clientAPI';
import { fetchShips } from '../../../http/shipAPI';

const EditRental = ({handleUpdateRental, show, onHide, rental, clientId, shipId }) => {
    const { ship, client } = useContext(Context);
    const [dateStart, setStartDate] = useState(rental.dateStart);
    const [dateEnd, setEndDate] = useState(rental.dateEnd);
    const [selectedClient, setSelectedClient] = useState(rental.clientId);
    const [selectedShip, setSelectedShip] = useState(rental.shipId);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (clientId) {
            setSelectedClient(clientId.toString());
        }
        if (shipId) {
            setSelectedShip(shipId.toString());
        }
    }, [clientId, shipId]);

    const validateForm = () => {
        const errors = {};

        if (!dateStart) {
            errors.dateStart = 'Введите дату начала';
        }

        if (!dateEnd) {
            errors.dateEnd = 'Введите дату окончания';
        }

        if (!selectedClient) {
            errors.selectedClient = 'Выберите клиента';
        }

        if (!selectedShip) {
            errors.selectedShip = 'Выберите судно';
        }

        if (dateStart >= dateEnd) {
            errors.dateEnd = 'Дата окончания должна быть позже даты начала';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const updateData = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const formData = new FormData();
            formData.append('dateStart', dateStart);
            formData.append('dateEnd', dateEnd);
            formData.append('clientId', selectedClient);
            formData.append('shipId', selectedShip);

            await updateRental(rental.id, formData).then((data) => {
                handleUpdateRental();
                onHide();
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить аренду
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <FormControl
                                className="mb-2"
                                required
                                min={1}
                                type="date"
                                placeholder="Дата начала"
                                value={dateStart}
                                onChange={(e) => setStartDate(e.target.value)}
                                isInvalid={!!formErrors.dateStart}
                            />
                        </Col>
                        <Col>
                            <FormControl
                                className="mb-2"
                                required
                                min={1}
                                type="date"
                                placeholder="Дата окончания"
                                value={dateEnd}
                                onChange={(e) => setEndDate(e.target.value)}
                                isInvalid={!!formErrors.dateEnd}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Select
                                aria-label="Выберите клиента"
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.target.value)}
                                isInvalid={!!formErrors.selectedClient}

                            >
                                <option>Выберите клиента</option>
                                {client.clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.surname} {client.name} {client.fathersName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                aria-label="Выберите судно"
                                value={selectedShip}
                                onChange={(e) => setSelectedShip(e.target.value)}
                                isInvalid={!!formErrors.selectedShip}
                            >
                                <option>Выберите судно</option>
                                {ship.Ships.map((ship) => (
                                    <option key={ship.id} value={ship.id}>
                                        {ship.name} ({ship.number})
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    {formErrors.dateStart && (
                        <Form.Text className="text-danger">{formErrors.dateStart}</Form.Text>
                    )}
                    {formErrors.dateEnd && (
                        <Form.Text className="text-danger">{formErrors.dateEnd}</Form.Text>
                    )}
                    {formErrors.selectedClient && (
                        <Form.Text className="text-danger">{formErrors.selectedClient}</Form.Text>
                    )}
                    {formErrors.selectedShip && (
                        <Form.Text className="text-danger">{formErrors.selectedShip}</Form.Text>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={updateData}>
                    Сохранить изменения
                </Button>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditRental;
