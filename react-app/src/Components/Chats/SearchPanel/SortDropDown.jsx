import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const sortType = {
	CountMembers: 0,
	CountMessages: 1,
	DateLastMessage: 2
};

function SortDropDown() {
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
						   onClick={() => {setActive(sortType.CountMembers)}}>
						   Количеству участников
			</Dropdown.Item>
			<Dropdown.Item active={activeItem === sortType.CountMessages}
						   onClick={() => {setActive(sortType.CountMessages)}}>
						   Количеству сообщений
			</Dropdown.Item>
			<Dropdown.Item active={activeItem === sortType.DateLastMessage}
						   onClick={() => {setActive(sortType.DateLastMessage)}}>
						   Дате последнего сообщения
			</Dropdown.Item>
		</Dropdown.Menu>
    </Dropdown>
  	);
}

export default SortDropDown;
