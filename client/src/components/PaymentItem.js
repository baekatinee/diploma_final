import React from 'react';
import { Button } from 'react-bootstrap';

const PaymentItem = ({ payment, clientSurname, rentalObj, clientId }) => {
  const rentalDateStart = rentalObj ? rentalObj.dateStart : '';

  const handleEditPayment = () => {
    // Обработчик для кнопки "Изменить" оплаты
    console.log('Edit payment:', payment.id);
  };

  const handleDeletePayment = () => {
    // Обработчик для кнопки "Удалить" оплаты
    console.log('Delete payment:', payment.id);
  };

  return (
    <tr>
      <td>{payment.id}</td>
      <td>{payment.dateStart}</td>
      <td>{payment.sum}</td>
      {clientId ? (
        <td>
          <Button variant="outline-dark" onClick={handleEditPayment}>
            Изменить
          </Button>{' '}
          <Button variant="outline-danger" onClick={handleDeletePayment}>
            Удалить
          </Button>{' '}
        </td>
      ) : (
        <td>{clientSurname}</td>
      )}
      <td>{rentalDateStart}</td>
    </tr>
  );
};

export default PaymentItem;
