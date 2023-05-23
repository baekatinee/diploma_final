import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Accordion } from 'react-bootstrap';
import ClientRentalItem from './ClientRentalItem';

const ClientRentalList = observer(({ clientId }) => {
  const { rental, client, ship } = useContext(Context);
  const rentalsArray = Object.values(rental.rentals).filter(rental => typeof rental === 'object');

  let filteredRentals;
  if (clientId) {
    filteredRentals = rentalsArray.filter(rental => rental.clientId === clientId);
  } else {
    filteredRentals = rentalsArray;
  }

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
          />
        );
      })}
    </Accordion>
  );
});

export default ClientRentalList;
