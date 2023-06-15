import React, { useState } from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { deletePayment, fetchPayments } from '../../http/paymentAPI';
import EditPayment from '../modals/Edit/EditPayment';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';


const ClientPaymentItem = ({ payment, clientObj, shipObj, onDeletePayment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentUpdateVisible, setPaymentUpdateVisible] = useState(false);
  const date = new Date(payment.dateStart); 
  const formattedDate = date.toLocaleDateString(); 
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
                  <EditButton onClick={()=>handleUpdatePayment} />
                  <EditPayment
                    key={payment.id}
                    payment={payment}
                    onHide={() => setPaymentUpdateVisible(false)}
                    show={paymentUpdateVisible}
                  />
                </div>
                <DeleteButton onClick={()=>handleDeletePayment(payment.id)} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ClientPaymentItem;