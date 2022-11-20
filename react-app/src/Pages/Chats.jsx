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
			<SearchPanel/>
			<Loading/>
		</>
		);
	} else {
		return (
			<>
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
