import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Table, Button } from 'react-bootstrap';
import PaymentItem from './PaymentItem';
import { deletePayment, fetchPayments } from '../../http/paymentAPI';
import { useLocation } from 'react-router-dom';
import { PAYMENTS_ROUTE } from '../../utils/consts';

const PaymentList = observer(({ clientId }) => {
  const { payment, client, rental } = useContext(Context);
  const location = useLocation();
  const isAllPayments = location.pathname === PAYMENTS_ROUTE;

  useEffect(() => {
    fetchPayments().then((data) => {
      if (payment) {
        payment.setPayments(data.rows);
      }
    });
  }, [payment]);

  let filteredPayments;
  if (clientId) {
    filteredPayments = payment.payments.filter(
      (payment) => payment.clientId === clientId
    );
  } else {
    filteredPayments = payment.payments;
  }

  const handleDelete = async (id) => {
    try {
      await deletePayment(id);
      fetchPayments().then((data) => {
        if (payment) {
          payment.setPayments(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Дата оплаты</th>
          <th>Сумма</th>
          {clientId && <th>Действия</th>}
          {!clientId && <th>Клиент</th>}
          <th>Аренда</th>
          {isAllPayments && <th>Действия</th>}
        </tr>
      </thead>
      <tbody>
        {filteredPayments &&
          filteredPayments.map((payment, index) => {
            const clientObj = client.clients.find(
              (c) => c.id === payment.clientId
            );
            const clientSurname = clientObj ? clientObj.surname : '';
            const rentalObj = Object.values(rental.rentals).find(
              (r) => r.id === payment.rentalId
            );
            return (
              <PaymentItem
                key={payment.id}
                payment={payment}
                rentalObj={rentalObj}
                clientSurname={clientSurname}
                clientId={clientId}
                handleDelete={handleDelete}
                iterator={index + 1}
                isAllPayments={isAllPayments} 
              />
            );
          })}
      </tbody>
    </Table>
  );
});

export default PaymentList;
