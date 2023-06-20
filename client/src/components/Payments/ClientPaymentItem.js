import React, { useState } from 'react';
import { Accordion, Button, Table, Modal } from 'react-bootstrap';
import EditPayment from '../modals/Edit/EditPayment';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';


const ClientPaymentItem = ({ payment, onDeletePayment, handleUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentUpdateVisible, setPaymentUpdateVisible] = useState(false);
  const date = new Date(payment.dateStart);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const formattedDate = date.toLocaleDateString();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const deleteOne = async (e) => {
    try {
      await onDeletePayment(payment.id);
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const openConfirmDeleteModal = (e) => {
    setConfirmDeleteVisible(true);
  };
  const closeConfirmDeleteModal = () => {
    setConfirmDeleteVisible(false);
  };
  const confirmDelete = () => {
    deleteOne();
  };
  const handleUpdatePayment = () => {
    setPaymentUpdateVisible(true);
  };

  return (
    <Accordion.Item className='border-0' eventKey={payment.id}>
      <Accordion.Header onClick={toggleAccordion}>Оплата № {payment.id}</Accordion.Header>
      <Accordion.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Дата оплаты</th>
              <th>Сумма</th>
              <th>ID аренды</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td>{formattedDate}</td>
              <td>{payment.sum}</td>
              <td>{payment.rentalId}</td>
              <td className='d-flex'>
                <div style={{ marginRight: '1rem' }}>
                  <EditButton onClick={handleUpdatePayment} />
                  <EditPayment
                    handleUpdate={handleUpdate}
                    key={payment.id}
                    payment={payment}
                    onHide={() => setPaymentUpdateVisible(false)}
                    show={paymentUpdateVisible}
                  />
                </div>
                <DeleteButton onClick={openConfirmDeleteModal} />
                <Modal show={confirmDeleteVisible} onHide={closeConfirmDeleteModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Удаление оплаты</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Вы уверены, что хотите удалить оплату?</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={closeConfirmDeleteModal}>
                      Отмена
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                      Удалить
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ClientPaymentItem;