import React from 'react';
import { Container, Row } from 'react-bootstrap';

function ChatPreviewInfo(props) {
	const countMembers = props.countMembers;
	const frequency = props.frequency;
	const countMessages = props.countMessages;
  	return (
    	<Container>
			<Row>
				<small>Участников: {countMembers}</small>
			</Row>
			<Row>
				<small>Частота сообщений: {frequency} сообщений в час</small>
			</Row>
			<Row>
				<small>Кол-во сообщений: {countMessages}</small>
			</Row>
		</Container>
  	);
}

export default ChatPreviewInfo;
