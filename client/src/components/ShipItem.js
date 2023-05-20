import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteShip, updateShip } from '../http/shipAPI';
import EditShip from './modals/EditShip';

const ShipItem = ({ ship, handleDelete, iterator }) => {
  const [shipUpdateVisible, setUpdateShipVisible] = useState(false);



  const deleteOne = async (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    try {
      await handleDelete(ship.id);
    } catch (e) {
      console.log(e);
    }
  };


  const openEditModal = (e) => {
    e.stopPropagation(); // Остановить распространение события клика
    setUpdateShipVisible(true);
  };

  return (
    <tr>
      <td>{iterator}</td>
      <td>{ship.name}</td>
      <td>{ship.number}</td>
      <td>{ship.length}</td>
      <td>{ship.priceSummer}</td>
      <td>{ship.priceWinter}</td>
      <td>{ship.parkingNumber}</td>
    
        <td style={{ width: '100%' }} className="d-flex justify-content-around">
          <Button variant="outline-dark" onClick={openEditModal}>
            Изменить
          </Button>{' '}
          <EditShip
            key={ship.id}
            ship={ship}
            show={shipUpdateVisible}
            onHide={() => setUpdateShipVisible(false)}
          />
          <Button variant="outline-danger" onClick={deleteOne}>
            Удалить
          </Button>
        </td>
    </tr>
  );
};

export default ShipItem;