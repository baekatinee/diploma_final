import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Table } from 'react-bootstrap';
import PaymentItem from './PaymentItem';

const PaymentList = observer(({ clientId }) => {
  const { payment, client, ship, rental } = useContext(Context);
  const paymentsArray = Object.values(payment.payments).filter(payment => typeof payment === 'object');
  console.log('paymentsArray:', paymentsArray);

  let filteredPayments;
  if (clientId) {
    filteredPayments = paymentsArray.filter(payment => payment.clientId === clientId);
  } else {
    filteredPayments = paymentsArray;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Дата оплаты</th>
          <th>Сумма</th>
          <th>Клиент</th>
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
              />
            );
          })}
      </tbody>
    </Table>
  );
});

export default PaymentList;
