import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, onHide, deleteAction, deleteParam, redirectPath }) => {
  const handleDelete = async () => {
    try {
      await deleteAction(deleteParam);
      onHide();
   
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при удалении клиента');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить клиента</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы уверены, что хотите удалить клиента?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
