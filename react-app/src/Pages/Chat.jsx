import React from 'react';
import { useParams } from 'react-router-dom';

function Chat() {
	const params = useParams()
  	return (
    	<div>{params.chatId}</div>
  	);
}

export default Chat;
