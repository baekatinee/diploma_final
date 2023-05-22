import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { fetchTypes } from '../../http/typeAPI'
import { createShip } from '../../http/shipAPI'



const CreateShip = ({ show, onHide }) => {
    const { ship } = useContext(Context)
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [typeId, setTypeId] = useState('');
    const [length, setLength] = useState('');
    const [priceSummer, setPriceSummer] = useState('');
    const [priceWinter, setPriceWinter] = useState('');
    const [parkingNumber, setParkingNumber] = useState('');
    useEffect(() => {

        fetchTypes().then(data => {
            if (ship) {
                ship.setTypes(data);
            }
        });
    }, []);
    const addShip = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('number', number);
            formData.append('typeId', typeId);
            formData.append('length', length);
            formData.append('priceSummer', priceSummer);
            formData.append('priceWinter', priceWinter);
            const data = await createShip(formData);
            onHide();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить судно
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='d-flex'>
                        <FormControl
                            required
                            className='mb-2'
                            name="name"
                            type="text"
                            placeholder={"Введите название"}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <FormControl className='mb-2'
                            required
                            type="text"
                            placeholder={"Введите бортовой номер"}
                            value={number}
                            onChange={(e) => {
                                setNumber(e.target.value);
                            }}
                        />

                    </div>
                    <div className='d-flex'>
                        <Form.Select name="typeId" value={typeId} onChange={(e) => {
                            setTypeId(e.target.value);
                        }} aria-label="Default select example">
                            <option>Выберите тип</option>
                            {ship.types.map(type =>
                                <option key={type.id}>{type.name}</option>)}
                        </Form.Select>
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
                            name="length"
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value);
                            }}
                            placeholder={"Введите длину"}
                        />
                    </div>
                    <div className='d-flex'>
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
                            placeholder={"Стоимость зима"}
                            name="priceWinter"
                            value={priceWinter}
                            onChange={(e) => {
                                setPriceWinter(e.target.value);
                              }}
                        />
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
                            placeholder={"Стоимость лето"}
                            name="priceSummer"
                            value={priceSummer}
                            onChange={(e) => {
                                setPriceSummer(e.target.value);
                              }}
                        />
                    </div>
                    <div className='d-flex'>
                        <FormControl
                            className='mb-2'
                            style={{ width: "50%" }}
                            required
                            type="number"
                            min={1}
                            max={90}
                            placeholder={"Парковочное место"}
                            name="parkingNumber"
                            value={parkingNumber}
                            onChange={(e) => {
                                setParkingNumber(e.target.value);
                              }}
                        />

                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-success">Добавить</Button>
                <Button onClick={onHide} variant="outline-danger">Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateShip