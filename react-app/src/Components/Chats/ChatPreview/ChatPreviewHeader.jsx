import React from 'react';

function ChatPreviewHeader(props) {
	const name = props.name;
  	return (
    	<h6 style={{marginTop: 5}}>{name}</h6>
  	)
}

export default ChatPreviewHeader;
