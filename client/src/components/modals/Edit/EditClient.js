import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { updateClient } from '../../../http/clientAPI';
import validator from 'validator';

const EditClient = ({ handleUpdateClient,show, onHide, client }) => {
  const [surname, setSurname] = useState(client.surname);
  const [name, setName] = useState(client.name);
  const [fathersName, setFathersName] = useState(client.fathersName);
  const [email, setEmail] = useState(client.email);
  const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
  const [comment, setComment] = useState(client.comment);
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!surname) {
      errors.surname = 'Введите фамилию';
    }

    if (!name) {
      errors.name = 'Введите имя';
    }

    if (!fathersName) {
      errors.fathersName = 'Введите отчество';
    }

    if (!email) {
      errors.email = 'Введите email';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Некорректный email';
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Введите номер телефона';
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
        surname,
        name,
        fathersName,
        email,
        phoneNumber,
        comment,
      };
      await updateClient(client.id, formData);
      handleUpdateClient();
      onHide();
    } catch (error) {
      setErrorMessage('Ошибка при обновлении клиента');
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактировать клиента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form>
          <Row className="mb-2">
            <Col>
              <Form.Control
                required
                type="text"
                name="surname"
                placeholder="Введите фамилию"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                isInvalid={!!formErrors.surname}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.surname}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control
                required
                type="text"
                name="fathersName"
                placeholder="Введите отчество"
                value={fathersName}
                onChange={(e) => setFathersName(e.target.value)}
                isInvalid={!!formErrors.fathersName}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.fathersName}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <Form.Control
                required
                type="text"
                name="phoneNumber"
                placeholder="Введите номер телефона"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                isInvalid={!!formErrors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phoneNumber}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="comment"
                placeholder="Комментарии"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Col>
          </Row>
          <Modal.Footer>
            <Button type="submit" variant="outline-success" onClick={updateData}>
              Сохранить изменения
            </Button>
            <Button variant="outline-danger" onClick={onHide}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditClient;
