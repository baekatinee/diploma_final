import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Accordion } from 'react-bootstrap';
import ClientRentalItem from './ClientRentalItem';
import { deleteRental, fetchRentals } from '../../http/rentalAPI';
import { fetchPayments } from '../../http/paymentAPI';
import { deleteShip, fetchShips } from '../../http/shipAPI';

const ClientRentalList = observer(({  handleCreatePayment, clientId }) => {
  const { rental, client, ship, payment } = useContext(Context);
  useEffect(() => {
    fetchRentals(null, null, null).then(data => {
      if (rental) {
        rental.setRentals(data.rows);
      }
    });
  }, [rental]);
  useEffect(() => {
    fetchPayments().then((data) => {
      if (payment) {
        payment.setPayments(data.rows);
      }
    });
  }, [payment]);
  useEffect(() => {
    fetchShips().then((data) => {
      if (ship) {
        ship.setShips(data.rows);
      }
    });
  }, [ship]);

  const handleUpdateRental = async () => {
    try {
      fetchRentals().then((data) => {
        if (rental) {
          rental.setRentals(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateShip = async () => {
    try {
      fetchShips().then((data) => {
        if (ship) {
          ship.setShips(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteShip = async (id) => {
    try {
      await deleteShip(id)
      fetchShips().then((data) => {
        if (ship) {
          ship.setShips(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  let filteredRentals;
  if (clientId) {
    filteredRentals = rental.rentals.filter(rental => rental.clientId === clientId);
  } else {
    filteredRentals = rental.rentals;
  }

  const handleDelete = async (rentalId) => {
    try {
      await deleteRental(rentalId)
      fetchRentals().then((data) => {
        if (rental) {
            rental.setRentals(data.rows);
        }
    });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Accordion>
      {filteredRentals.map(rental => {
        const clientObj = client.clients.find(c => c.id === rental.clientId);
        const shipObj = ship.Ships.find(s => s.id === rental.shipId);

        if (!clientObj || !shipObj) {
          return null;
        }

        return (
          <ClientRentalItem
            handleDeleteShip={handleDeleteShip}
            handleCreatePayment={handleCreatePayment}
            handleUpdateRental={handleUpdateRental}
            key={rental.id}
            rental={rental}
            handleUpdateShip={handleUpdateShip}
            clientObj={clientObj}
            shipObj={shipObj}
            handleDelete={handleDelete}
          />
        );
      })}
    </Accordion>
  );
});

export default ClientRentalList;
