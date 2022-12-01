import React from 'react';
import {Spinner, Col, Row} from 'react-bootstrap';
 

function Loading() {
  return (
    <Row className='mt-5'>
        <Col sm={6}></Col>
        <Col sm={6}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Col>
    </Row>
  )
}

export default Loading;