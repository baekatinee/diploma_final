import React, { useState } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { deletePayment, fetchPayments } from '../http/paymentAPI';
import EditPayment from './modals/EditPayment';


const ClientPaymentItem = ({ payment, clientObj, shipObj, onDeletePayment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentUpdateVisible, setPaymentUpdateVisible] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleDeletePayment = async (id) => {
    try {
      await deletePayment(id);
      onDeletePayment(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdatePayment = () => {
    setPaymentUpdateVisible(true);
  };

  return (
    <Accordion.Item eventKey={payment.id}>
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
              <td>{payment.dateStart}</td>
              <td>{payment.sum}</td>
              <td>{payment.rentalId}</td>
              <td>
                <Button variant="outline-dark" onClick={handleUpdatePayment}>
                  Изменить
                </Button>{' '}
                <EditPayment
                  key={payment.id}
                  payment={payment}
                  onHide={() => setPaymentUpdateVisible(false)}
                  show={paymentUpdateVisible}
                />
                <Button variant="outline-danger" onClick={() => handleDeletePayment(payment.id)}>
                  Удалить
                </Button>{' '}
              </td>
            </tr>
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ClientPaymentItem;