import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { fetchTypes } from '../../http/typeAPI';
import { createShip, fetchShips } from '../../http/shipAPI';

const CreateShip = ({ show, onHide }) => {
  const { ship } = useContext(Context);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [typeId, setTypeId] = useState('');
  const [length, setLength] = useState('');
  const [priceSummer, setPriceSummer] = useState('');
  const [priceWinter, setPriceWinter] = useState('');
  const [existingNumbers, setExistingNumbers] = useState([]);
  const [existingParkingNumbers, setExistingParkingNumbers] = useState([]);
  const [parkingNumber, setParkingNumber] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTypes().then(data => {
      ship.setTypes(data);
    });
    fetchShips().then(data => {
      if (ship) {
        ship.setShips(data.rows);
        setExistingNumbers(ship.Ships.map(shipItem => shipItem.number.toLowerCase()));
        setExistingParkingNumbers(ship.Ships.map(shipItem => shipItem.parkingNumber));
      }
    });
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Введите название';
    }

    if (!number) {
      errors.number = 'Введите бортовой номер';
    } else if (existingNumbers.includes(number.toLowerCase())) {
      errors.number = 'Яхта с таким бортовым номером уже существует';
    }

    if (!typeId) {
      errors.typeId = 'Выберите тип';
    }

    if (!length || length <= 0) {
      errors.length = 'Введите корректную длину';
    }

    if (!priceSummer || priceSummer <= 0) {
      errors.priceSummer = 'Введите корректную стоимость лето';
    }

    if (!priceWinter || priceWinter <= 0) {
      errors.priceWinter = 'Введите корректную стоимость зима';
    }

    if (!parkingNumber || parkingNumber <= 0 || parkingNumber > 90) {
      errors.parkingNumber = 'Введите корректное парковочное место';
    } else if (existingParkingNumbers.includes(Number(parkingNumber))) {
      errors.parkingNumber = 'Это место уже занято';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addShip = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = {
        name,
        number,
        typeId,
        length,
        priceSummer,
        priceWinter,
        parkingNumber,
      };

      const data = await createShip(formData);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить судно
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-2">
            <Col>
              <Form.Control
                required
                type="text"
                placeholder="Введите название"
                value={name}
                onChange={e => setName(e.target.value)}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                placeholder="Введите бортовой номер"
                value={number}
                onChange={e => setNumber(e.target.value)}
                isInvalid={!!formErrors.number}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.number}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Select
                required
                name="typeId"
                value={typeId}
                onChange={e => setTypeId(e.target.value)}
                isInvalid={!!formErrors.typeId}
              >
                <option value="">Выберите тип</option>
                {ship.types && ship.types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors.typeId}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                required
                type="number"
                min={1}
                placeholder="Введите длину"
                value={length}
                onChange={e => setLength(e.target.value)}
                isInvalid={!!formErrors.length}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.length}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control
                required
                type="number"
                min={1}
                placeholder="Введите стоимость зима"
                value={priceWinter}
                onChange={e => setPriceWinter(e.target.value)}
                isInvalid={!!formErrors.priceWinter}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.priceWinter}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                required
                type="number"
                min={1}
                placeholder="Введите стоимость лето"
                value={priceSummer}
                onChange={e => setPriceSummer(e.target.value)}
                isInvalid={!!formErrors.priceSummer}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.priceSummer}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={6}>
              <Form.Control
                required
                type="number"
                min={1}
                max={90}
                placeholder="Парковочное место"
                value={parkingNumber}
                onChange={e => setParkingNumber(e.target.value)}
                isInvalid={!!formErrors.parkingNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.parkingNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addShip} variant="outline-success">
          Добавить
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateShip;
