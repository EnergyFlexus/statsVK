import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

import NavigationLinks from './NavigationLinks';
import NavigationLogo from './NavigationLogo';
import AuthorizationLink from './AuthorizationLink';

const pages = [
    {id: 0, text: 'Главная', link: '/'},
    {id: 1, text: 'Чаты', link: '/chats'},
    {id: 2, text: 'F.A.Q.', link: '/faq'},
];

function NavigationBar(props) {
    return ( 
        <Navbar collapseOnSelect bg="dark" expand="sm" variant='dark'>
            <Container>
                <NavbarToggle aria-controls='responsive-navbar-nav'/>
                <NavbarCollapse id='responsive-navbar-nav'>
                    <NavigationLogo link = '/'/>
                    <NavigationLinks pages = {pages}/>
                    <AuthorizationLink link="/auth" text = "Авторизация"/>
                </NavbarCollapse>
            </Container>
        </Navbar> 
    )
}

export default NavigationBar;