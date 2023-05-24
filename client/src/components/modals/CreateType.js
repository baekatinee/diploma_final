import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../..';
import { Modal, Form, Button, FormControl } from 'react-bootstrap';
import { createType, fetchTypes } from '../../http/typeAPI';

const CreateType = ({ show, onHide }) => {
  const { ship } = useContext(Context);
  const [name, setTypeName] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [existingTypes, setExistingTypes] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => {
      ship.setTypes(data);
      setExistingTypes(data.map(type => type.name.toLowerCase()));
    });
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Введите название типа';
    } else if (existingTypes.includes(name.toLowerCase())) {
      errors.name = 'Тип с таким названием уже существует';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addType = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = {
        name,
      };

      const data = await createType(formData);
      onHide();
    } catch (error) {
      console.error(error);
    }

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Добавить тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormControl
            placeholder="Название типа"
            value={name}
            onChange={(e) => setTypeName(e.target.value)}
            isInvalid={!!formErrors.name}
          />
          {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addType} variant="outline-success">
          Добавить
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
