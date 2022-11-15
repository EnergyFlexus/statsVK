import { useEffect } from 'react';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import NavigationBar from '../Components/NavigationBar/NavigationBar';
import ChatPreviewCard from '../Components/Chats/ChatPreviewCard';
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
	},
	{
		id: 1,
		name: 'Чат номер два',
		countMembers: 13,
	},
	{
		id: 2,
		name: 'Чат номер три',
		countMembers: 14,
	},
];

function Chats() {
	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();
	// Как Леха (который снюсоед) сделает бэк - поменять
	useEffect(() => {
		fetch(testUrl)
		.then(res => res.json())
		.then((result) => {
			setItems(result);
			setIsLoaded(true);
		},
		(error) => {
			setError(error);
			setIsLoaded(false);
		});
	});
	if (error) {
		return (
		<>
			<NavigationBar/>
			Error: {error.message}
		</>
		);
	} else if (!isLoaded) {
		return (
		<>
			<NavigationBar/>
			<Loading/>
		</>
		);
	} else {
		return (
			<>
				<NavigationBar/>
				<SearchPanel/>
				<Container>
					{
						// Не забыть сменить testItems на items
						testItems.map((item) => (<ChatPreviewCard attr={item} key={item.id}/>))
					}
				</Container>
			</>
		);
	}
	
}

export default Chats;
