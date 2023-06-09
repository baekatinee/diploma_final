import React, { useState } from 'react';
import { Modal, Form, Button, FormControl } from 'react-bootstrap';
import { updateType } from '../../../http/typeAPI';

const EditType = ({ show, onHide, type }) => {
  const [name, setName] = useState(type.name);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Введите название типа';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateData = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = {
        name,
      };

      await updateType(type.id, formData);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Редактировать тип</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormControl
            placeholder="Название типа"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!formErrors.name}
          />
          {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
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

export default EditType;
