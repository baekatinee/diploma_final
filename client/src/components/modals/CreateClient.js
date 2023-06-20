import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Col, Row } from 'react-bootstrap';
import { createClient } from '../../http/clientAPI';
import validator from 'validator';

const CreateClient = ({ handleCreate,show, onHide }) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');
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

  const addClient = async (e) => {
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
      const data = await createClient(formData);
      handleCreate()
      onHide();
    } catch (error) {
      setErrorMessage('Ошибка при добавлении клиента');
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить клиента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={addClient}>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addClient} variant="outline-success">
          Добавить
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateClient;
