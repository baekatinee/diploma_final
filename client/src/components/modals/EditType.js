import React, { useState } from 'react';
import { Modal, Form, Button, FormControl, FormLabel } from 'react-bootstrap';
import { updateType } from '../../http/typeAPI';

const EditType = ({ show, onHide, type }) => {
    

  const [name, setName] = useState(type.name);

  const updateData = () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      updateType(type.id, formData).then((data) => {
        onHide();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактировать тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateData}>
          <div className="d-flex">
            <FormLabel>Название типа</FormLabel>
            <FormControl
              className="mb-2"
              required
              type="text"
              name="name"
              placeholder="Введите название типа"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="submit" variant="outline-success">
            Сохранить изменения
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Закрыть
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditType;