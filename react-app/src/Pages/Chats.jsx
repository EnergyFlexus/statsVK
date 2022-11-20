import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import ChatPreviewCard from '../Components/Chats/ChatPreview/ChatPreviewCard';
import SearchPanel from '../Components/Chats/SearchPanel/SearchPanel';
import Loading from '../Components/Loading';

// Для тестирования fetch
const testUrl = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
// Тестирование UI
const testItems = [
	{
		id: 0,
		name: 'Чат номер один',
		countMembers: 12,
		countMessages: 100,
		frequency: 2.5,
	},
	{
		id: 1,
		name: 'Чат номер два',
		countMembers: 13,
		countMessages: 120,
		frequency: 3.5,
	},
	{
		id: 2,
		name: 'Чат номер три',
		countMembers: 14,
		countMessages: 1000,
		frequency: 1.1,
	},
];

function Chats() {
	const allItems = testItems;

	const [items, setItems] = useState(testItems);
	const [isLoaded, setIsLoaded] = useState(true);
	const [error, setError] = useState();
	const [searchString, setSearchString] = useState('');

	const setSearch = ((search) => {
		const reg = RegExp(search, 'iu');
		const _items = allItems.filter((item) => (reg.test(item.name)));
		setItems(_items);
		setSearchString(search);
	});
	// Как Леха (который снюсоед) сделает бэк - поменять
	// useEffect(() => {
	// 	fetch(testUrl)
	// 	.then(res => res.json())
	// 	.then((result) => {
	// 		setItems(result);
	// 		setIsLoaded(true);
	// 	},
	// 	(error) => {
	// 		setError(error);
	// 		setIsLoaded(false);
	// 	});
	//  }, []);
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
