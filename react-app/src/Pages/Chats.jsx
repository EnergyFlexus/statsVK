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
		const allChatsUrl = '/api/ChatsAll';
		/**
		 * @param {Array} ids
		 * @return {String}
		 */
		const getChatInfoUrl = (ids) => (`/api/vk/ChatInfoById?chat_ids=${ids.join(',')}`);
		const fetching = (async (url) => {
			try {
				let res = await fetch(url);
				res = await res.json();
				console.log(res);
				return res;
			} catch (error) {
				setError(error);
			}
		});
		fetching(getChatInfoUrl([8]));
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
