import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import StatusBar from '../components/StatusBar'
import ShipList from '../components/ShipList'

const ShipsPage = () => {

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
        </Container>
    )
}

export default ShipsPage
