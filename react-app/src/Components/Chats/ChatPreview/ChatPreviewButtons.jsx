import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const buttonStyle = {
	width: 150,
};

function ChatPreviewButtons(props) {
	const id = props.id;
  	return (
		<Container style={{marginTop: 13}}>
			<Row>
				<Col md="auto">
					<Link to={'/chats/' + id}>
						<Button style={buttonStyle} variant="primary">Подробнее</Button>
					</Link>
				</Col>
				<Col md="auto">
					<Link>
						<Button style={buttonStyle} variant="success">Купить</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
}

export default ChatPreviewButtons;
