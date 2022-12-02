import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function SortDropDown(props) {
	const setSort = props.setSort;
	const sortType = props.sortType;

	const [activeItem, setActiveItem] = useState(sortType.CountMembers);

	const setActive = ((sortType) => {
		setActiveItem(sortType);
	});

  	return (
    <Dropdown>
		<Dropdown.Toggle variant="dark" id="dropdown-basic">
			Сортировать по
		</Dropdown.Toggle>

		<Dropdown.Menu variant="dark">
			<Dropdown.Item active={activeItem === sortType.CountMembers} 
						   onClick={() => {setActive(sortType.CountMembers); setSort(sortType.CountMembers)}}>
						   Количеству участников
			</Dropdown.Item>
			<Dropdown.Item active={activeItem === sortType.CountMessages}
						   onClick={() => {setActive(sortType.CountMessages); setSort(sortType.CountMessages)}}>
						   Количеству сообщений
			</Dropdown.Item>
			<Dropdown.Item active={activeItem === sortType.DateLastMessage}
						   onClick={() => {setActive(sortType.DateLastMessage); setSort(sortType.DateLastMessage)}}>
						   Дате последнего сообщения
			</Dropdown.Item>
		</Dropdown.Menu>
    </Dropdown>
  	);
}

export default SortDropDown;
