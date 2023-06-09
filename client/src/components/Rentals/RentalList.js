import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Table } from 'react-bootstrap';
import RentalItem from './RentalItem';
import { fetchRentals } from '../../http/rentalAPI';


const RentalList = observer(({ clientId }) => {
  const { rental, client, ship } = useContext(Context);
  useEffect(() => {
    fetchRentals().then(data => {
      if (rental) {
        rental.setRentals(data.rows);
      }
    });
  }, [])
  const rentalsArray = Object.values(rental.rentals).filter(rental => typeof rental === 'object');

  let filteredRentals;
  if (clientId) {
    filteredRentals = rentalsArray.filter(rental => rental.clientId === clientId);
  } else {
    filteredRentals = rentalsArray;
  }

  return (
    <Table hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Клиент</th>
          <th>Судно</th>
          <th>Начало аренды</th>
          <th>Конец аренды</th>
        </tr>
      </thead>
      <tbody>
        {filteredRentals.map(rental => {
          const clientObj = client.clients.find(c => c.id === rental.clientId);
          const clientSurname = clientObj ? clientObj.surname : '';
          const shipObj = ship.Ships.find(s => s.id === rental.shipId);
          const shipName = shipObj ? shipObj.name : '';
          return (
            <RentalItem
              key={rental.id}
              rental={rental}
              clientSurname={clientSurname}
              shipName={shipName}
            />
          );
        })}
      </tbody>
    </Table>
  );
});

export default RentalList;
