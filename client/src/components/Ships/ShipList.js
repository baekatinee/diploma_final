import React, { useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import ShipItem from './ShipItem';
import { deleteShip, fetchShips } from '../../http/shipAPI';

const ShipList = observer((handleUpdateShip) => {
  const { ship } = useContext(Context);
  useEffect(() => {
    fetchShips().then(data => {
      if (ship) {
        ship.setShips(data.rows);
      }
    });
  }, [ship]);
  const handleDelete = async (id) => {
    try {
      await deleteShip(id);
      fetchShips().then(data => {
        if (ship) {
          ship.setShips(data.rows);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async () => {
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
  return (
    <Table hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Бортовой номер</th>
          <th>Длина</th>
          <th>Стоимость лето</th>
          <th>Стоимость зима</th>
          <th>Парковочное место</th>
          <th >Действия</th>
        </tr>
      </thead>
      <tbody>
        {ship.Ships.map((ship, index) => (
          <ShipItem
            handleUpdateShip={handleUpdate}
            key={ship.id}
            iterator={index + 1}
            ship={ship}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </Table>
  );
})

export default ShipList;