//название ссылок через пропсы не прокинешь из-за того что создаются не 3 ссылки, а 9 
//поэтому пришлось так если идеи лучше есть пишите работяги я за пивлм

import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';

function TopNavigationLinks() {
    return (
        <NavbarCollapse id='responsive-navbar-nav'>
            <Nav className = 'me-auto' >
                <NavLink href = '/'>Главная</NavLink>
                <NavLink href = '/Chats/'>Чаты</NavLink>
                <NavLink href = '/FAQ/'>FAQ</NavLink>
            </Nav> 
            <Nav className = 'me-right'>
                <NavLink href = '/Authorization/'>Авторизация</NavLink>
            </Nav> 
        </NavbarCollapse>

    );
}

export default TopNavigationLinks;