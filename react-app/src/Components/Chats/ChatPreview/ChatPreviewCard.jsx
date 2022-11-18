import React from 'react';
import Card from 'react-bootstrap/Card';
import ChatPreviewBody from './ChatPreviewBody';
import ChatPreviewHeader from './ChatPreviewHeader';

function ChatPreviewCard(props) {
  	const name = props.attr.name;
  	const countMembers = props.attr.countMembers;
	const avatar = props.attr.avatar;
	const frequency = props.attr.frequency;
	const countMessages = props.attr.countMessages;
	const id = props.attr.id;
  	return (
    	<Card className='mb-3'>
      		<Card.Header>
        		<ChatPreviewHeader name={name}/>
      		</Card.Header>
      		<Card.Body>
				<ChatPreviewBody avatar={avatar} countMembers={countMembers} frequency={frequency} countMessages={countMessages} name={name} id={id}/>
      		</Card.Body>
    	</Card>
  	);
}

export default ChatPreviewCard;
