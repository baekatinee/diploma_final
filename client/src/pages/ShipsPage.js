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
            <Row>
                <Col md={3}>
                    <StatusBar />
                </Col>
                <Col>
                    <ShipList></ShipList>
                </Col>
            </Row>
        </Container>
    )
}

export default ShipsPage
