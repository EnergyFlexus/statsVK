import React from 'react';
import {Spinner, Col, Row} from 'react-bootstrap';
 

function Loading() {
  return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loading;