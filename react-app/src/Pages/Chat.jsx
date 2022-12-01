import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import ChatBlock from '../Components/Chat/ChatBlock'; 
import MembersBlock from '../Components/Members/MembersBlock';
import ChatHeader from '../Components/ChatHeader/ChatHeader';
import ChatChartCountMessages from '../Components/ChatsCharts/ChartChatCountMessages/ChatChartCountMessages';
import ChatChartMembersMessages from '../Components/ChatsCharts/ChatChartMembersMessages/ChatChartMembersMessages';

function Chat() {
	const params = useParams();

	const [chatInfo, setChatInfo] = useState({});
	const [favoritesStatus, setFavoritesStatus] = useState(false);
	const [messages, setMessages] = useState([]);	
	const [members, setMembers] = useState([]);

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
	}, true);
	const [fetchingSetFavorites, isFavoritesLoading] = useFetch(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000));
		setFavoritesStatus(!favoritesStatus);
	});
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
	}, true);
	const [msgsFetching, isMsgsLoading] = useFetch(async () => {
		let res = await fetch(`/api/MessagesByChatIdOffset/${params.chatId}/50?order=desc`);
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
	}, true);


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
			<Row className='justify-content-xl-center mt-4'>
				<Col md={12} xl={10}>
					<ChatHeader
						showSkeleton={isChatInfoLoading || isMembersLoading}
						avatar={chatInfo.avatar}
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
			<Row className='justify-content-xl-center mt-4'>
				<Col md={7} xl={6} style={{height: '530px'}}>
					<div className='d-flex flex-column h-100'>
						<Card className='h-100'>
							<Card.Body className='h-100'>
								<ChatBlock 
									showSkeleton={isMsgsLoading || isMembersLoading} 
									countSkeletonItems={11} 
									messages={messages}
								/>
							</Card.Body>
						</Card>						
					</div>
				</Col>
				<Col md={5} xl={4}>
					<Col className='mt-4 mt-md-0' style={{height: '265px'}}>
						<Card className='h-100'>
							<Card.Body className='h-100'>
								<MembersBlock 
									showSkeleton={isMembersLoading} 
									countSkeletonItems={5} 
									members={members}
								/>
							</Card.Body>
						</Card>
					</Col>
					<Col className='pt-4' style={{height: '265px'}}>
						<Card className='h-100'>
							<Card.Body className='h-100'>
								<ChatChartMembersMessages
									usersName={members.length > 0 && members.map((user) => `${user.last_name} ${user.first_name[0]}.`)}
									usersCountMessages={messages.length > 0 && members.map((user) => user.messages_count)}
								/>
							</Card.Body>
						</Card>
					</Col>
				</Col>
			</Row>
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
