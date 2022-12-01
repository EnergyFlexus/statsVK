import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import ChatPreviewCard from '../Components/Chats/ChatPreview/ChatPreviewCard';
import SearchPanel from '../Components/Chats/SearchPanel/SearchPanel';
import Loading from '../Components/Loading';

function Chats() {
	const [allItems, setAllItems] = useState([]);
	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();
	const [searchString, setSearchString] = useState('');


	const setSearch = ((search) => {
		const reg = RegExp(search, 'iu');
		const _items = allItems.filter((item) => (reg.test(item.name)));
		setItems(_items);
		setSearchString(search);
	});
	useEffect(() => {
		// Дата последнего сообщения
		const allChatsUrl = '/api/ChatsAll';
		// Дата последнего сообщения
		const messagesCountsInChats = '/api/MessagesCountsInChatsAll';
		/**
		 * @param {Array} ids
		 * @return {String}
		 */
		const getChatInfoUrl = (ids) => (`/api/vk/ChatInfoById?chat_ids=${ids.join(',')}`);
		const fetching = (async (url) => {
			try {
				let res = await fetch(url);
				res = await res.json();
				return res;
			} catch (error) {
				setError(error);
			}
		});
		const getData = (async () => {
			/**
			 * @type {Array}
			 */
			let allChats = await fetching(allChatsUrl);
			let allMessageCount = await fetching(messagesCountsInChats);
			let allChatsMap = new Map();
			allChats.forEach((item) => {
				allChatsMap.set(item.chat_id, item.last_message_date);
			});
			allMessageCount.forEach((item) => {
				allChatsMap.set(item.chat_id, {lastMessageDate: allChatsMap.get(item.chat_id), countMessages: item.messages_count});
			});
			/**
			 * @type {Array}
			 */
			let allChatsInfo = await fetching(getChatInfoUrl(allChats.map((item) => (item.chat_id))));
			let result = [];
			console.log(allChatsInfo);
			allChatsInfo.forEach((item) => {
				let res = {}
				res.id = item.id;
				res.name = item.title;
				res.countMembers = item.members_count;
				res.avatar = item.photo && item.photo.photo_100;
				res.lastMessageDate = allChatsMap.get(res.id).lastMessageDate * 1000;
				res.countMessages = allChatsMap.get(res.id).countMessages;
				result.push(res);
			});
			setAllItems(result);
			setItems(result);
			setIsLoaded(true);
		});
		getData();
	}, []);
	if (error) {
		return (
		<>
			Error: {error.message}
		</>
		);
	} else if (!isLoaded) {
		return (
		<>
			<Loading/>
		</>
		);
	} else if(items.length > 0){
		return (
			<>
				<SearchPanel setSearch = {setSearch}/>
				<Container>
					{
						items.map((item) => (<ChatPreviewCard attr={item} key={item.id}/>))
					}
				</Container>
			</>
		);
	} else {
		return (
			<>
				<SearchPanel setSearch = {setSearch}/>
				<Container>
					По запросу {searchString} ничего не было найдено.
				</Container>
			</>
		);
	}
	
}

export default Chats;
