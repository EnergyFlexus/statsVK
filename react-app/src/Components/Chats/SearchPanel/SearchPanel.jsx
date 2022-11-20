import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import SortDropDown from './SortDropDown';

function SearchPanel() {
	return (
    	<Container className='mt-4 px-2.5'>
			<Row>
				<Col>
					<Form.Control placeholder="Начните вводить название чата" onChange={(event) => {console.log('a')}}/>
				</Col>
				<Col md="auto">
					<SortDropDown/>
				</Col>
			</Row>
    	</Container>
  	)
}

export default SearchPanel;
