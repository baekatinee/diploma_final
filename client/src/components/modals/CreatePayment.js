import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button, FormControl } from 'react-bootstrap';
import { Context } from '../..';

import { createPayment } from '../../http/paymentAPI';

const CreatePayment = ({ show, onHide }) => {
  const { rental, client } = useContext(Context);
  const [dateStart, setStartDate] = useState('');
  const [sum, setSum] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRental, setSelectedRental] = useState('');

  const clientRentals = rental.rentals.filter((rental) => rental.clientId === +selectedClient);

  const addPayment = () => {
    try {
      const formData = new FormData();
      formData.append('dateStart', dateStart);
      formData.append('sum', sum);
      formData.append('clientId', selectedClient);
      formData.append('rentalId', selectedRental);

      createPayment(formData).then((data) => {
        onHide();
        // Дополнительные действия после создания платежа
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить оплату</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex">
            <FormControl
              className="mb-2"
              required
              min={1}
              type="date"
              placeholder={"Дата оплаты"}
              value={dateStart}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormControl
              className="mb-2"
              required
              min={1}
              type="number"
              placeholder={"Сумма"}
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </div>
          <div className="d-flex">
            <Form.Select
              aria-label="Default select example"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <option>Выберите клиента</option>
              {client.clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.surname} {client.name} {client.fathersName}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              value={selectedRental}
              onChange={(e) => setSelectedRental(e.target.value)}
              disabled={!selectedClient}
            >
              <option>Выберите аренду</option>
              {clientRentals.map((rental) => (
                <option key={rental.id} value={rental.id}>
                  {rental.ship.name} {rental.ship.number}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addPayment} variant="outline-success">
          Добавить
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePayment;