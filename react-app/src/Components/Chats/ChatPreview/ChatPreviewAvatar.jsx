import React from 'react'

const avatarStyle = {
	borderRadius: 32,
};

function ChatPreviewAvatar(props) {
	const avatar = props.avatar;
  	return (
    	<>
			<img src={avatar}
			height = '64'
			width= '64'
			alt = ''
			style={avatarStyle}/>
		</>
  	);
}

export default ChatPreviewAvatar;