import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ChatBlock from '../Components/Chat/ChatBlock'; 
import MembersBlock from '../Components/Members/MembersBlock';
import ChatHeader from '../Components/ChatHeader/ChatHeader';
import ChatChartCountMessages from '../Components/ChatsCharts/ChartChatCountMessages/ChatChartCountMessages';

function Chat() {
	const params = useParams();
	params.chatId = 8; 
	const [chatInfo, setChatInfo] = useState({});
	const [fetchingChatInfo, isChatInfoLoading] = useFetch(async () => {
		let res = await fetch(`/api/vk/ChatInfoById?chat_ids=${params.chatId}`);
		res = await res.json();
		res = res[0];

		let resCountMsg = await fetch(`/api/MessagesCountsByChatId/${params.chatId}`);
		resCountMsg = await resCountMsg.json();
		
		const ownerInMembmerArr = members.find(member => member.id === res.owner_id);
		setChatInfo({
			...chatInfo,
			name: res.title,
			avatar: res.photo.photo_100,
			countMembers: res.members_count,
			countMessages: resCountMsg,
			ownerName: `${ownerInMembmerArr.first_name} ${ownerInMembmerArr.last_name}`,
		});
	});
	const [favoritesStatus, setFavoritesStatus] = useState(false);
	const [fetchingSetFavorites, isFavoritesLoading] = useFetch(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		setFavoritesStatus(!favoritesStatus);
	});
	const [messages, setMessages] = useState([]);	
	const [members, setMembers] = useState([]);
	const [membersFetching, isMembersLoading] = useFetch(async () => {
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
	const [msgsFetching, isMsgsLoading] = useFetch(async () => {
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
		if(!isMembersLoading && members.length > 0) {
			fetchingChatInfo();
			msgsFetching();
		}
	}, [isMembersLoading]);

	return (
		<Container>
			<Row className='justify-content-xl-center mt-5'>
				<Col md={12} xl={10}>
					<ChatHeader
						showSkeleton={isChatInfoLoading || isMembersLoading}
						avatar={'https://sun1-85.userapi.com/s/v1/ig2/XLI3bEgl2lhsyWPSPSQTbS1WkgI8YaJLflcennaidODonF2PulZBhtayWBRynxVd8O5d1v0UlsPvrxjfEAicc-Ou.jpg?size=200x0&quality=96&crop=0,0,992,992&ava=1'}
						name={chatInfo.name}
						hasInFavorites={favoritesStatus}
						lockFavoritesBtn={isFavoritesLoading}
						ownerName={chatInfo.ownerName}
						countMessages={chatInfo.countMessages}
						countMembers={chatInfo.countMembers}

						onChangeFavorites={fetchingSetFavorites}
					/>
				</Col>
			</Row>
			<Row className='justify-content-xl-center mt-3' style={{height: '530px'}}>
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
			<Row className='justify-content-xl-center mt-4'>
				<Col md={12} xl={10}>
					<Card className='h-100'>
						<Card.Body className='h-100'>
							<ChatChartCountMessages id={params.chatId}/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Chat;
