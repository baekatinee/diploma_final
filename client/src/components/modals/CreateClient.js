import React, { useState } from 'react';
import { Modal, Form, Button, FormControl, Alert } from 'react-bootstrap';
import { createClient } from '../../http/clientAPI';
import validator from 'validator';

const CreateClient = ({ show, onHide }) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addClient = async () => {
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      setErrorMessage('Некорректный email');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('surname', surname);
      formData.append('name', name);
      formData.append('fathersName', fathersName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('comment', comment);
      const data = await createClient(formData);
      setSuccessMessage('Клиент успешно добавлен');
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
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={addClient}>
          <div className="d-flex">
            <FormControl
              required
              className="mb-2"
              type="text"
              name="surname"
              placeholder={"Введите фамилию"}
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <FormControl
              className="mb-2"
              required
              type="text"
              name="name"
              placeholder={"Введите имя"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="d-flex">
            <FormControl
              className="mb-2"
              required
              type="text"
              name="fathersName"
              placeholder={"Введите отчество"}
              value={fathersName}
              onChange={(e) => {
                setFathersName(e.target.value);
              }}
            />
            <FormControl
              className="mb-2"
              required
              type="email"
              name="email"
              placeholder={"Введите email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="d-flex">
            <FormControl
              className="mb-2"
              required
              type="phone"
              name="phoneNumber"
              placeholder={"Введите номер телефона"}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <FormControl
              className="mb-2"
              type="text"
              name="comment"
              placeholder={"Комментарии"}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <Button type="submit" variant="outline-success">
            Добавить
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Закрыть
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateClient;