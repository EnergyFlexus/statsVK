import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ChatBlock from '../Components/Chat/ChatBlock'; 
import MembersBlock from '../Components/Members/MembersBlock';


const membersArr = [
	{name: 'Алексей Нагаев', vkId: 172437155,  avatar: 'https://sun1-92.userapi.com/s/v1/ig2/pioMRVaPFeV40MWXbOMwleOQ9ksFaaENm_2qEVfvcJ_JcWUJgIzwd-NC0vGiNpScPORiUgf1IFa9TR8zpqSuUAST.jpg?size=50x50&quality=96&crop=81,3,775,775&ava=1'},
	{name: 'Алексей Кошелев', vkId: 192381527, avatar: 'https://sun1-90.userapi.com/s/v1/ig2/bmLTzYSqkPJaJTAZxhhev9fq8EEDj4u567746whbgR7OEzH92gCKp33DJQrap-ZyHjDd4j_taybM2FrjXanTOYs-.jpg?size=50x50&quality=95&crop=162,0,414,414&ava=1'},
	{name: 'Александр Нагаев', vkId: 161341536, avatar: 'https://sun1-20.userapi.com/s/v1/if1/ijutZkHOUISiSvbaE57Z76_kf49GDKvvjeLGENlRwOgo4VXXrB24f-3YXMt_yP7pv2REwQ.jpg?size=50x50&quality=96&crop=299,685,915,915&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
	{name: 'Андрей Муминов', vkId:497108580, avatar: 'https://sun1-47.userapi.com/s/v1/ig2/YpJJmVrAaoOTp2kXPmjANG6Gut1v9UeJizto6DpX3ezbolakMscWfqdVTM-PqszoxKFAQhD1NkqCKkBdyv-589CE.jpg?size=50x50&quality=95&crop=0,0,736,736&ava=1'},
]

function Chat() {
	const [messages, setMessages] = useState([]);	
	const [msgsFetching, isMsgsLoading, msgsError] = useFetch(async () => {
		let res = await fetch('/api/messagesAll');
		res = await res.json();
		res = res.map(msg => {
			return {
				...msg, 
				name: membersArr.find(member => member.vkId === msg.user_id).name,
				avatar: membersArr.find(member => member.vkId === msg.user_id).avatar,
			}
		});
		setMessages(res);
	});


	useEffect(() => {
		msgsFetching();
	}, []);

	const params = useParams()
	if(isMsgsLoading)
		return <>Loading...</>
	else{
		return (
			<Container>
				<Row className='justify-content-xl-center mt-5' style={{height: '500px'}}>
					<Col md={7} xl={6} className='h-100'>
						<div className='d-flex flex-column h-100'>
							<h2 className='text-center'>Пипидастр</h2>
							<ChatBlock messages={messages}/>
						</div>
					</Col>
					<Col md={5} xl={3} className='h-100'>
						<div className='d-flex flex-column h-50 mt-4 mt-md-0'>
							<h2 className='text-center'>Участники</h2>
							<MembersBlock members={membersArr}/>
						</div>
						<div className='d-flex flex-column h-50 pt-4'>
							<h2 className='text-center'>Активность</h2>
							<MembersBlock members={membersArr}/>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Chat;
