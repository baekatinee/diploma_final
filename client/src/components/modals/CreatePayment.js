import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { Context } from '../..'

import { createPayment } from '../../http/paymentAPI'
const CreatePayment = ({ show, onHide }) => {
    const { ship, client } = useContext(Context)
    const [dateStart, setStartDate] = useState('');
    const [sum, setSum] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedShip, setSelectedShip] = useState('');
    const addPayment = () => {
        try {
            const formData = new FormData();
            formData.append('dateStart', dateStart);
            formData.append('sum', sum);
            formData.append('clientId', selectedClient);
            formData.append('shipId', selectedShip);

            createPayment(formData).then((data) => {
                onHide();
                // Дополнительные действия после создания аренды
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить оплату
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex'>
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="date"
                            placeholder={"Дата оплаты"}
                            value={dateStart}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
                            placeholder={"Сумма"}
                            value={sum}
                            onChange={(e) => setSum(e.target.value)}
                        />
                    </div>
                    <div className='d-flex'>
                        <Form.Select aria-label="Default select example" value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}>
                            <option>Выберите клиента</option>
                            {client.clients.map(client =>
                                <option key={client.id} value={client.id}>{client.surname} {client.name} {client.fathersName}</option>
                            )}
                        </Form.Select>
                        <Form.Select aria-label="Default select example" value={selectedShip}
                            onChange={(e) => setSelectedShip(e.target.value)}>
                            <option>Выберите судно</option>
                            {ship.Ships.map(ship =>
                                <option key={ship.id} value={ship.id}>{ship.name} {ship.number}</option>
                            )}
                        </Form.Select>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={addPayment} variant="outline-success">Добавить</Button>
                <Button onClick={onHide} variant="outline-danger">Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePayment
