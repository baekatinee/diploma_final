import React, { useContext, useState, useEffect } from 'react';
import { Modal, Form, Button, FormControl, Col, Row } from 'react-bootstrap';
import { Context } from '../..';
import { createRental } from '../../http/rentalAPI';
import { fetchClients } from '../../http/clientAPI';
import { fetchShips } from '../../http/shipAPI';

const CreateRental = ({ show, onHide }) => {
  const { ship, client } = useContext(Context);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedShip, setSelectedShip] = useState('');
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

  const validateForm = () => {
    const errors = {};

    if (!startDate) {
      errors.startDate = 'Введите дату начала';
    }

    if (!endDate) {
      errors.endDate = 'Введите дату окончания';
    }

    if (!selectedClient) {
      errors.selectedClient = 'Выберите клиента';
    }

    if (!selectedShip) {
      errors.selectedShip = 'Выберите судно';
    }

    if (startDate >= endDate) {
      errors.endDate = 'Дата окончания должна быть позже даты начала';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addRental = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('dateStart', startDate);
      formData.append('dateEnd', endDate);
      formData.append('clientId', selectedClient);
      formData.append('shipId', selectedShip);

      await createRental(formData);
      onHide();
      // Дополнительные действия после создания аренды
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить аренду
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                isInvalid={!!formErrors.startDate}
              />
            </Col>
            <Col>
              <FormControl
                className="mb-2"
                required
                min={1}
                type="date"
                placeholder="Дата окончания"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                isInvalid={!!formErrors.endDate}
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
          {formErrors.startDate && (
            <Form.Text className="text-danger">{formErrors.startDate}</Form.Text>
          )}
          {formErrors.endDate && (
            <Form.Text className="text-danger">{formErrors.endDate}</Form.Text>
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
        <Button variant="outline-success" onClick={addRental}>
          Добавить
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRental;
