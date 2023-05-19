import React, { useContext, useEffect } from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { Context } from '../..'
import { fetchTypes } from '../../http/typeAPI'



const CreateShip = ({ show, onHide }) => {
    const { ship, type } = useContext(Context)
    useEffect(() => {

        fetchTypes().then(data => {
            if (type) {
               type.setTypes(data.rows);
            }
        });
    }, []);
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
                            type="text"
                            placeholder={"Введите название"}
                        />
                        <FormControl className='mb-2'
                            required
                            type="text"
                            placeholder={"Введите бортовой номер"}
                        />

                    </div>
                    <div className='d-flex'>
                        <Form.Select aria-label="Default select example">
                            <option>Выберите тип</option>
                            {type.types.map(type =>
                                <option key={type.id}>{type.name}</option>)}
                        </Form.Select>
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
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
                        />
                        <FormControl
                            className='mb-2'
                            required
                            min={1}
                            type="number"
                            placeholder={"Стоимость лето"}
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