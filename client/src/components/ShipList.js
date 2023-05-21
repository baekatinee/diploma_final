import React, { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { Table } from 'react-bootstrap';
import ShipItem from './ShipItem';
import { fetchShips } from '../http/shipAPI';
import { deleteShip } from '../http/shipAPI';

const ShipList = observer(() => {
    useEffect(() => {
        fetchShips().then(data => {
            if (ship) {
                ship.setShips(data.rows);
            }
        });
    }, []);
    const { ship } = useContext(Context)
    const shipsArray = Object.values(ship.Ships).filter(ship => typeof ship === 'object')
    console.log('shipsArray:', shipsArray);
    const handleDelete = async (id) => {
        try {
            await deleteShip(id);
            fetchShips();
        } catch (e) {
            console.log(e);
        }
    }
    let iterator = 1;
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Бортовой номер</th>
                    <th>Длина</th>
                    <th>Стоимость лето</th>
                    <th>Стомиость зима</th>
                    <th>Парковочное место</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {console.log(ship.Ships)}
                {ship.Ships && Array.isArray(ship.Ships) && ship.Ships.map(shipItem =>
                    <ShipItem key={shipItem.id} iterator={iterator++} ship={shipItem} handleDelete={handleDelete}>
                    </ShipItem>
                )}
            </tbody>
        </Table>
    )
})

export default ShipList