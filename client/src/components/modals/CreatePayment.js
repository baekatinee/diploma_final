import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button, FormControl, Col, Row} from 'react-bootstrap';
import { Context } from '../..';

import { createPayment } from '../../http/paymentAPI';
import { fetchRentals } from '../../http/rentalAPI';
import { fetchClients } from '../../http/clientAPI';

const CreatePayment = ({ show, onHide, clientId, rentalId }) => {
  const { rental, client } = useContext(Context);
  const [dateStart, setStartDate] = useState('');
  const [sum, setSum] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRental, setSelectedRental] = useState('');
  const [error, setError] = useState('');
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchClients().then(data => {
      if (client) {
        client.setClients(data.rows);
      }
    });
    fetchRentals().then(data => {
      if (rental) {
        rental.setRentals(data.rows);
      }
    });
  }, []);
  useEffect(() => {
    if (clientId) {
      setSelectedClient(clientId.toString());
    }
    if (rentalId) {
      setSelectedRental(rentalId.toString());
    }
  }, [clientId, rentalId]);

  const clientRentals = rental.rentals.filter((rental) => rental.clientId === +selectedClient);

  const validateForm = () => {
    const errors = {};

    if (!dateStart) {
      errors.dateStart = 'Введите дату оплаты';
    }

    if (!sum) {
      errors.sum = 'Введите сумму';
    }
    if (!selectedClient) {
      errors.selectedClient = 'Выберите клиента';
    }
    if (!selectedRental) {
      errors.selectedRental = 'Выберите аренду';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addPayment = async () => {
    setIsAddingPayment(true);
    if (!validateForm()) {
      return;
    }

    try {
      const formData = {
        dateStart,
        sum,
        clientId: clientId || selectedClient,
      rentalId: rentalId || selectedRental,
      };

      const data = await createPayment(formData);
      onHide();
    } catch (error) {
      console.error(error);
    }

    setIsAddingPayment(false);
  };


  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить оплату</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Row className="mb-2">
            <Col>
            <FormControl
              className="mb-2"
              required
              min={1}
              type="date"
              placeholder="Дата оплаты"
              value={dateStart}
              isInvalid={!!formErrors.dateStart}
              onChange={(e) => setStartDate(e.target.value)}
            />
              <Form.Control.Feedback type="invalid">
                {formErrors.dateStart}
              </Form.Control.Feedback>
              </Col>
            <Col>
            <FormControl
              className="mb-2"
              required
              min={1}
              type="number"
              placeholder="Сумма"
              value={sum}
              isInvalid={!!formErrors.sum}
              onChange={(e) => setSum(e.target.value)}
            />
              <Form.Control.Feedback type="invalid">
                {formErrors.sum}
              </Form.Control.Feedback>
              </Col>
          </Row>
          <Row className="mb-2">
            <Col>
            <Form.Select
              aria-label="Default select example"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              disabled={clientId}
              isInvalid={!!formErrors.selectedClient}
            >
              <option>Выберите клиента</option>
              {client.clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.surname} {client.name} {client.fathersName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {formErrors.clientId}
              </Form.Control.Feedback>
              </Col>
            <Col>
            <Form.Select
              aria-label="Default select example"
              value={selectedRental}
              onChange={(e) => setSelectedRental(e.target.value)}
              disabled={!selectedClient}
              isInvalid={!!formErrors.selectedRental}
            >
              <option>Выберите аренду</option>
              {clientRentals.map((rental) => (
                <option key={rental.id} value={rental.id}>
                  с {rental.dateStart} по {rental.dateEnd}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {formErrors.rentalId}
              </Form.Control.Feedback>
              </Col>
          </Row>
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
    </Modal>
  );
};

export default CreatePayment;
