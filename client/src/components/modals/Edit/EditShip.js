import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { fetchShips, updateShip } from '../../../http/shipAPI';
import { fetchTypes } from '../../../http/typeAPI';
import { Context } from '../../..';

const EditShip = ({ handleUpdateShip, show, onHide, shipItem }) => {
  const { ship } = useContext(Context);
  const [name, setName] = useState(shipItem.name);
  const [number, setNumber] = useState(shipItem.number);
  const [typeId, setTypeId] = useState(shipItem.typeId);
  const [length, setLength] = useState(shipItem.length);
  const [priceSummer, setPriceSummer] = useState(shipItem.priceSummer);
  const [priceWinter, setPriceWinter] = useState(shipItem.priceWinter);
  const [parkingNumber, setParkingNumber] = useState(shipItem.parkingNumber);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTypes().then(data => {
      ship.setTypes(data);
    });
    fetchShips().then(data => {
      if (ship) {
        ship.setShips(data.rows);
    
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
    } 


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateData = async (e) => {
    e.preventDefault();
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

      await updateShip(shipItem.id, formData).then((data) => {
        handleUpdateShip()
        onHide();
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактировать судно</Modal.Title>
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setNumber(e.target.value)}
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
                onChange={(e) => setTypeId(e.target.value)}
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
                onChange={(e) => setLength(e.target.value)}
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
                onChange={(e) => setPriceWinter(e.target.value)}
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
                onChange={(e) => setPriceSummer(e.target.value)}
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
                onChange={(e) => setParkingNumber(e.target.value)}
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
        <Button onClick={updateData} variant="outline-success">
          Сохранить изменения
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditShip;
