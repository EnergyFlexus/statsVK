import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-bootstrap/NavLink';
import TopNavigationLogo from './TopNavigationLogo'

const navLinkStyle = {
    marginTop: 3,
}

function TopNavigationLinks() {
    return (
        <NavbarCollapse id='responsive-navbar-nav'>
            <Nav className = 'me-auto' >
                
                <NavLink href = '/'>  
                    <TopNavigationLogo/>
                </NavLink>

                <NavLink style={navLinkStyle} href = '/'>Главная</NavLink>
                <NavLink style={navLinkStyle} href = '/Chats/'>Чаты</NavLink>
                <NavLink style={navLinkStyle} href = '/FAQ/'>FAQ</NavLink>
            </Nav> 
            <Nav className = 'me-right'>
                <NavLink href = '/Authorization/'>Авторизация</NavLink>
            </Nav> 
        </NavbarCollapse>
    );
}
export default TopNavigationLinks;