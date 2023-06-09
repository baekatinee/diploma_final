import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Button, Breadcrumb } from 'react-bootstrap';
import StatusBar from '../components/StatusBar';
import ShipList from '../components/ShipList';
import { fetchShips } from '../http/shipAPI';
import { fetchTypes } from '../http/typeAPI';
import CreateShip from '../components/modals/CreateShip';
import Pages from '../components/Pages';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
const ShipsPage = observer(() => {
    const {ship}=useContext(Context)
    const [shipVisible, setShipVisible] = useState(false);
    useEffect(() => {
        if (!ship.selectedType) {
          fetchShips(null, ship.page, 10)
            .then((data) => {
              ship.setShips(data.rows);
              ship.setTotalCount(data.count);
            })
            .catch((error) => {
              // Handle the error here
            });
        } else {
          fetchShips(ship.selectedType.id, ship.page, 10)
            .then((data) => {
              ship.setShips(data.rows);
              ship.setTotalCount(data.count);
            })
            .catch((error) => {
              // Handle the error here
            });
        }
      }, [ship.page, ship.selectedType]);
      
    return (
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Дашборд</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Судна
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row className="mb-2">
                <Col md={10}>
                    <h1>Все судна</h1>
                </Col>
                <Col md={2} className="d-flex align-items-center">
                    <Button variant="outline-primary" onClick={() => setShipVisible(true)}>
                        Добавить судно
                    </Button>
                    <CreateShip show={shipVisible} onHide={() => setShipVisible(false)} />
                </Col>
            </Row>
            
            <Row className="mb-2">
                <Col>
                    <StatusBar />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ShipList/>
                </Col>
            </Row>
            <Pages />
        </Container>
    );
})

export default ShipsPage;
