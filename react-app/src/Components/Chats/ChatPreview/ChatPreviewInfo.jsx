import React from 'react';
import { Container, Row } from 'react-bootstrap';

function ChatPreviewInfo(props) {
	const countMembers = props.countMembers;
	const lastMessageDate = props.lastMessageDate;
	const countMessages = props.countMessages;
  	return (
    	<Container>
			<Row>
				<small>Участников: {countMembers}</small>
			</Row>
			<Row>
				<small>Дата последнего сообщения: {(new Date(lastMessageDate)).toLocaleString()}</small>
			</Row>
			<Row>
				<small>Кол-во сообщений: {countMessages}</small>
			</Row>
		</Container>
  	);
}

export default ChatPreviewInfo;
