import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Table, Button } from 'react-bootstrap';
import PaymentItem from './PaymentItem';
import { fetchPayments } from '../http/paymentAPI';

const PaymentList = observer(({ clientId }) => {
  const { payment, client, ship, rental } = useContext(Context);

  useEffect(() => {
    fetchPayments().then(data => {
      if (payment) {
        payment.setPayments(data.rows);
      }
    });
  }, [])
  let filteredPayments;
  if (clientId) {
    filteredPayments = payment.payments.filter(payment => payment.clientId === clientId);
  } else {
    filteredPayments = payment.payments;
  }

  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Дата оплаты</th>
          <th>Сумма</th>
          {clientId && <th>Действия</th>}
          {!clientId && <th>Клиент</th>}
          <th>Аренда</th>
        </tr>
      </thead>
      <tbody>
        {filteredPayments &&
          filteredPayments.map(payment => {
            const clientObj = client.clients.find(c => c.id === payment.clientId);
            const clientSurname = clientObj ? clientObj.surname : '';
            const shipObj = ship.Ships.find(s => s.id === payment.shipId);
            const rentalObj = Object.values(rental.rentals).find(r => r.id === payment.rentalId);
            const shipName = shipObj ? shipObj.name : '';
            return (
              <PaymentItem
                key={payment.id}
                payment={payment}
                rentalObj={rentalObj}
                clientSurname={clientSurname}
                shipName={shipName}
                clientId={clientId}
              />
            );
          })}
      </tbody>
    </Table>
  );
});

export default PaymentList;
