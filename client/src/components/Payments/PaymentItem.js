import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import EditPayment from '../modals/Edit/EditPayment';

const PaymentItem = ({ isAllPayments, payment,handleUpdate, clientSurname, rentalObj, clientId, handleDelete, iterator }) => {
  const rentalDateStart = rentalObj ? rentalObj.dateStart : '';
  const [paymentUpdateVisible, setUpdatePaymentVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  let date = new Date(payment.dateStart);
  const formattedDate = date.toLocaleDateString();
  date = new Date(rentalDateStart);
  const formattedDateRental = date.toLocaleDateString();
  const deleteOne = async (e) => {
    try {
      await handleDelete(payment.id);
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };  
  const openEditModal = async (e) => {
  setUpdatePaymentVisible(true);
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
  return (
    <tr>
      <td>{iterator}</td>
      <td>{formattedDate}</td>
      <td>{payment.sum}</td>
      {clientId ? (
        " "
      ) : (
        <td>{clientSurname}</td>
      )}
      <td>{formattedDateRental}</td>
      {isAllPayments &&
        <td className="d-flex">
          <div style={{ marginRight: "1rem" }}>
            <EditButton onClick={openEditModal} />
          </div>

          <EditPayment
            payment={payment}
            show={paymentUpdateVisible}
            onHide={() => setUpdatePaymentVisible(false)}
            handleUpdate={handleUpdate}
         />
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
      }
    </tr>
  );
};

export default PaymentItem;
