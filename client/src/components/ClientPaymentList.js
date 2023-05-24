import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Accordion } from 'react-bootstrap';
import ClientPaymentItem from './ClientPaymentItem';
import { fetchPayments, deletePayment } from '../http/paymentAPI';

const ClientPaymentList = observer(({ clientId }) => {
  const { payment, client } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments().then(data => {
      if (payment) {
        payment.setPayments(data.rows);
      }
      setLoading(false);
    });
  }, [payment]);

  const paymentsArray = Object.values(payment.payments).filter(payment => typeof payment === 'object');
  const filteredPayments = paymentsArray.filter(payment => payment.clientId === clientId);

  const handleDeletePayment = async (paymentId) => {
    try {
      await deletePayment(paymentId);
      payment.removePayment(paymentId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Accordion>
      {filteredPayments.map(payment => {
        const clientObj = client.clients.find(c => c.id === payment.clientId);
        if (!clientObj) {
          return null;
        }

        return (
          <ClientPaymentItem
            key={payment.id}
            payment={payment}
            clientObj={clientObj}
            onDeletePayment={handleDeletePayment}
          />
        );
      })}
    </Accordion>
  );
});

export default ClientPaymentList;
