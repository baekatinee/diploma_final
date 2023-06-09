import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Accordion } from 'react-bootstrap';
import ClientRentalItem from './ClientRentalItem';
import {deleteRental, fetchRentals } from '../../http/rentalAPI';

const ClientRentalList = observer(({ clientId }) => {
  const { rental, client, ship } = useContext(Context);
  useEffect(() => {
    fetchRentals().then(data => {
      if (rental) {
        rental.setRentals(data.rows);
      }
    });
  }, [rental]);
  const rentalsArray = Object.values(rental.rentals).filter(rental => typeof rental === 'object');

  let filteredRentals;
  if (clientId) {
    filteredRentals = rentalsArray.filter(rental => rental.clientId === clientId);
  } else {
    filteredRentals = rentalsArray;
  }

  const handleDelete = async (id) => {
    try {
      await deleteRental(id);
      fetchRentals().then(data => {
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
            key={rental.id}
            rental={rental}
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