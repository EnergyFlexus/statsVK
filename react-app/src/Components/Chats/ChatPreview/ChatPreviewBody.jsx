import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ChatPreviewAvatar from './ChatPreviewAvatar';
import ChatPreviewButtons from './ChatPreviewButtons';
import ChatPreviewInfo from './ChatPreviewInfo';

function ChatPreviewBody(props) {
	const name = props.name;
	const avatar = props.avatar;
	const countMembers = props.countMembers;
	const lastMessageDate = props.lastMessageDate;
	const countMessages = props.countMessages;
	const id = props.id;
  	return (
    	<Container>
			<Row>
				<Col md="auto">
					<ChatPreviewAvatar avatar={avatar}/>
				</Col>
				<Col>
					<ChatPreviewInfo countMembers={countMembers} lastMessageDate={lastMessageDate} countMessages={countMessages}/>
				</Col>
				<Col md="auto">
					<ChatPreviewButtons id={id} name={name}/>
				</Col>
			</Row>
		</Container>
  	);
}

export default ChatPreviewBody;
