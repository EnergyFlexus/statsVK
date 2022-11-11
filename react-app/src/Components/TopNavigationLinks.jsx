import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';
import TopNavigationLogo from './TopNavigationLogo'

function TopNavigationLinks() {
    return (
        <NavbarCollapse id='responsive-navbar-nav'>
            <Nav className = 'me-auto' >
                
                <NavLink href = '/'>  
                    <TopNavigationLogo/>
                </NavLink>

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