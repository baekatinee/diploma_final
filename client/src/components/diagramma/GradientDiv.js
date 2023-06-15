import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { Context } from '../..';

const GradientDiv = observer(({ subtitle, number, progress, colorLeft, colorRight }) => {
  const {client}= useContext(Context)
    const gradientBackground = {
        background: `linear-gradient(to right, ${colorLeft}, ${colorRight})`,
        color: "#fff",
        borderRadius: "10px",
    };

    return (
        <Col md={3}>
            <div className='p-4' style={gradientBackground}>
                <Row>
                    <h1>{number}</h1>
                </Row>
                <Row>
                    <ProgressBar className='mb-2' variant="light" style={{ backgroundColor: 'rgba(217, 217, 217, 0.27)', height: '5px' }} now={progress} />
                </Row>
                <Row>
                    <h6>{subtitle}</h6>
                </Row>
            </div>
        </Col>

    );
})

export default GradientDiv;
