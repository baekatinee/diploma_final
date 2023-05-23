import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button, FormControl, Toast } from 'react-bootstrap';
import { Context } from '../..';

import { createPayment } from '../../http/paymentAPI';

const CreatePayment = ({ show, onHide, clientId, rentalId }) => {
  const { rental, client } = useContext(Context);
  const [dateStart, setStartDate] = useState('');
  const [sum, setSum] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRental, setSelectedRental] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  useEffect(() => {
    if (clientId) {
      setSelectedClient(clientId.toString());
    }
    if (rentalId) {
      setSelectedRental(rentalId.toString());
    }
  }, [clientId, rentalId]);

  const clientRentals = rental.rentals.filter((rental) => rental.clientId === +selectedClient);

  const addPayment = async () => {
    setIsAddingPayment(true);

    try {
      const formData = new FormData();
      formData.append('dateStart', dateStart);
      formData.append('sum', sum);
      formData.append('clientId', selectedClient);
      formData.append('rentalId', selectedRental);

      const response = await createPayment(formData);
      if (response.data.success) {
        setSuccess(true);
        setStartDate('');
        setSum('');
        setSelectedClient('');
        setSelectedRental('');
        setError('');
        setTimeout(() => {
          setSuccess(false);
          onHide();
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Произошла ошибка при добавлении платежа');
      console.error(error);
    }

    setIsAddingPayment(false);
  };

  const resetError = () => {
    setError('');
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
              placeholder="Дата оплаты"
              value={dateStart}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormControl
              className="mb-2"
              required
              min={1}
              type="number"
              placeholder="Сумма"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </div>
          <div className="d-flex">
            <Form.Select
              aria-label="Default select example"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              disabled={clientId}
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
                  с {rental.dateStart} по {rental.dateEnd} {rental.ship.name} {rental.ship.number}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addPayment} variant="outline-success" disabled={isAddingPayment || error !== ''}>
          Добавить
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
      <Toast show={success} onClose={() => setSuccess(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Успешно</strong>
        </Toast.Header>
        <Toast.Body>Платеж успешно добавлен.</Toast.Body>
      </Toast>
      <Toast show={error !== ''} onClose={resetError} bg="danger" text="white" delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">Ошибка</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </Modal>
  );
};

export default CreatePayment;
