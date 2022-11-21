import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ChatBlock from '../Components/Chat/ChatBlock'; 
import MembersBlock from '../Components/Members/MembersBlock';

function Chat() {
	const params = useParams();
	params.chatId = 8;
	const [messages, setMessages] = useState([]);	
	const [members, setMembers] = useState([]);
	const [membersFetching, isMembersLoading, membersError] = useFetch(async () => {
		let res = await fetch(`/api/ChatUsersByChatId/${params.chatId}`);
		res = await res.json();

		let resVk = await fetch(`/api/vk/UsersInfoByChatId/${params.chatId}`);
		resVk = await resVk.json();

		resVk = resVk.map(itemInVk => {
			return {
				...itemInVk,
				messages_count: res.find(item => item.user_id === itemInVk.id).messages_count
			}
		});

		resVk = resVk.sort((a,b) => b.messages_count - a.messages_count);
		setMembers(resVk);
	});
	const [msgsFetching, isMsgsLoading, msgsError] = useFetch(async () => {
		let res = await fetch('/api/messagesAll');
		res = await res.json();
		res = res.map(msg => {
			const userInMembmerArr = members.find(member => member.id === msg.user_id);
			return {
				...msg, 
				name: `${userInMembmerArr.first_name} ${userInMembmerArr.last_name}`,
				avatar: userInMembmerArr.photo_50,
			}
		});
		setMessages(res);
	});


	useEffect(() => {
		membersFetching();
	}, []);

	useEffect(() => {
		if(!isMembersLoading && members.length > 0)
			msgsFetching();
	}, [isMembersLoading]);


	useEffect(() => {
		console.log(msgsError && msgsError);
		console.log(membersError && membersError);
	}, [msgsError, membersError]);

	return (
		<Container>
			<Row className='justify-content-xl-center mt-5' style={{height: '530px'}}>
				<Col md={7} xl={6} className='h-100'>
					<div className='d-flex flex-column h-100'>
						<h2 className='text-center'>Сообщения</h2>
						<Card className='h-100'>
							<Card.Body className='h-100'>
								<ChatBlock 
									showSkeleton={isMsgsLoading || isMembersLoading} 
									countSkeletonItems={10} 
									messages={messages}
								/>
							</Card.Body>
						</Card>						
					</div>
				</Col>
				<Col md={5} xl={4} className='h-100'>
					<div className='d-flex flex-column h-50 mt-4 mt-md-0'>
						<h2 className='text-center'>Участники</h2>
						<Card className='h-100'>
							<Card.Body className='h-100'>
								<MembersBlock 
									showSkeleton={isMembersLoading} 
									countSkeletonItems={4} 
									members={members}
								/>
							</Card.Body>
						</Card>
					</div>
					<div className='d-flex flex-column h-50 pt-4'>
						<h2 className='text-center'>О чате</h2>
						<Card className='h-100'>
							<ListGroup variant="flush">
								<ListGroup.Item><span><b>Создатель:</b> Алексей Нагаев</span></ListGroup.Item>
								<ListGroup.Item><span><b>Количество участников:</b> 4</span></ListGroup.Item>
								<ListGroup.Item><span><b>Количество сообщений:</b> 12 500</span></ListGroup.Item>
							</ListGroup>
							<Card.Body>
								<Button className='w-100' variant="success">Скачать чат</Button>
							</Card.Body>
						</Card>
					</div>
				</Col>
			</Row>
			<h1 className='mt-5'>ЕБАНАЯ ВЕРТСКА Я ЕЁ РОТ ЕБАЛ ПРОСТО</h1>
		</Container>
	);
}

export default Chat;
