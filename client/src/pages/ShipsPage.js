import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import StatusBar from '../components/StatusBar'
import ShipList from '../components/ShipList'
import { Context } from '..'
import { fetchShips } from '../http/shipAPI'
import Pages from '../components/Pages'
import { fetchTypes } from '../http/typeAPI'

const ShipsPage = () => {
    const { ship} = useContext(Context)
    useEffect(() => {
        fetchShips(null,  1, 2).then(data => {
            if (ship) {
                ship.setShips(data.rows);
                ship.setTotalCount(data.count)
            }
        });
        fetchTypes().then(data =>ship.setTypes(data))
    }, []);
    useEffect(() => {
        fetchShips(ship.selectedType.id, ship.page, 2).then(data => {
    
                ship.setShips(data.rows);
                ship.setTotalCount(data.count)
         
        });
        
    }, [ship.page, ship.selectedType,]);
    return (
        <Container>
            <h1>
                Все судна
            </h1>
            <Row className=' mb-2'>
                <Col>
                    <StatusBar />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ShipList></ShipList>
                </Col></Row>
            <Pages></Pages>
        </Container>
    )
}

export default ShipsPage
